package com;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.analyticsreporting.v4.AnalyticsReporting;
import com.google.api.services.analyticsreporting.v4.AnalyticsReportingScopes;
import com.google.api.services.analyticsreporting.v4.model.*;
import org.json.JSONObject;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by gadiel on 06/11/2017.
 */
public class GoogleAnalyticsHelper {

	private static final String APPLICATION_NAME = "Hello Analytics Reporting";
	private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
//	private static final String KEY_FILE_LOCATION = "C:\\googleAnalytics\\BizDevOps-87d300dadb2a.json";
	private static final String VIEW_ID = "135777719";


	public JSONObject getReport(String octaneModuleName, String startDate, String endDate, String metric, String dimensions) {
		try {
			AnalyticsReporting service = initializeAnalyticsReporting();
			GetReportsResponse response = getReport(service, octaneModuleName, startDate, endDate, metric, dimensions);
			return convertResponseToJson(response);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}


	private static AnalyticsReporting initializeAnalyticsReporting() throws GeneralSecurityException, IOException {

		HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
		GoogleCredential credential = GoogleCredential
				.fromStream(new FileInputStream(Properties.JsonFileLocation))
				.createScoped(AnalyticsReportingScopes.all());

		// Construct the Analytics Reporting service object.
		return new AnalyticsReporting.Builder(httpTransport, JSON_FACTORY, credential)
				.setApplicationName(APPLICATION_NAME).build();
	}


	private static GetReportsResponse getReport(AnalyticsReporting service, String octaneModuleName, String startDate, String endDate, String metric, String dimensions) throws IOException {
		// Create the DateRange object.
		DateRange dateRange = new DateRange();
		dateRange.setStartDate(startDate);
		dateRange.setEndDate(endDate);

//		// Create the Metrics object.
//		Metric sessions = new Metric()
//				.setExpression("ga:pageviews")
//				.setAlias("pageviews");
//
//		Dimension pageTitle = new Dimension().setName("ga:pageTitle");

		// Create the Metrics object.
		Metric sessions = new Metric()
				.setExpression(metric)
				.setAlias(metric);

		List<Dimension> listDimensions = new LinkedList<Dimension>();
		String[] array = dimensions.split(",");
		for (int i = 0; i < array.length; i++) {
			listDimensions.add( new Dimension().setName(array[i]));
		}



		// add filter
		DimensionFilter dimensionFilter = new DimensionFilter();
		dimensionFilter.setDimensionName(array[0])
						.setOperator("BEGINS_WITH")
						.setExpressions(Arrays.asList(octaneModuleName));
		List<DimensionFilter> listDimensionsFilter = new LinkedList<DimensionFilter>();
		listDimensionsFilter.add(dimensionFilter);
		DimensionFilterClause dimensionFilterClause = new DimensionFilterClause();
		dimensionFilterClause.setFilters(listDimensionsFilter);
		List<DimensionFilterClause> listDimensionFilterClause = new LinkedList<DimensionFilterClause>();
		listDimensionFilterClause.add(dimensionFilterClause);


		// Create the ReportRequest object.
		ReportRequest request = new ReportRequest()
				.setViewId(VIEW_ID)
				.setDateRanges(Arrays.asList(dateRange))
				.setMetrics(Arrays.asList(sessions))
				.setDimensions(listDimensions)
				.setDimensionFilterClauses(listDimensionFilterClause);

		ArrayList<ReportRequest> requests = new ArrayList<ReportRequest>();
		requests.add(request);

		// Create the GetReportsRequest object.
		GetReportsRequest getReport = new GetReportsRequest()
				.setReportRequests(requests);


		// Call the batchGet method.
		GetReportsResponse response = service.reports().batchGet(getReport).execute();

		// Return the response.
		return response;
	}


	private static JSONObject convertResponseToJson(GetReportsResponse response) {

		JSONObject result = new JSONObject();

		for (Report report : response.getReports()) {

			ColumnHeader header = report.getColumnHeader();
			List<String> dimensionHeaders = header.getDimensions();
			List<MetricHeaderEntry> metricHeaders = header.getMetricHeader().getMetricHeaderEntries();
			List<ReportRow> rows = report.getData().getRows();

			if (rows == null) {
				return result;
			}

			JSONObject jsonReport = new JSONObject();

			int rowsCount = 0;
			for (ReportRow row : rows) {

				JSONObject jsonRow = new JSONObject();

				List<String> dimensions = row.getDimensions();
				List<DateRangeValues> metrics = row.getMetrics();

				List<String> dims = new LinkedList<String>();
				for (int i = 0; i < dimensionHeaders.size() && i < dimensions.size(); i++) {
					dims.add(dimensionHeaders.get(i) + ": " + dimensions.get(i));
				}
				jsonRow.put("dimensions", dims);

				for (int j = 0; j < metrics.size(); j++) {
					JSONObject jsonMetrics = new JSONObject();
					DateRangeValues values = metrics.get(j);
					for (int k = 0; k < values.getValues().size() && k < metricHeaders.size(); k++) {
						String usage = metricHeaders.get(k).getName() + ": " + values.getValues().get(k);
						jsonMetrics.put("usage", usage);
					}
					jsonRow.put("Metrics", jsonMetrics);
				}

				jsonReport.put("row" + rowsCount, jsonRow);
				rowsCount++;
			}

			result.put("report", jsonReport);
		}
		return result;
	}
}
