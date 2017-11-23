package com;

import org.json.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/*
part 2/2 of the minimal server
 */

@Path("bdo/ga")
public class Rest {
	@GET
	@Path("hello")
	@Produces(MediaType.TEXT_PLAIN)
	public Response helloWorld() {
		return Response.ok().entity("aaaaaaaaaa")
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}


	@GET
	@Path("bye")
	@Produces(MediaType.TEXT_PLAIN)
	public String helloBye() {
		return "Bye, world!";
	}


	//example: http://localhost:9999/bdo/ga?start-date=2017-11-03&end-date=2017-11-09

	@GET
	@Path("pageViews")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getGoogleAnalyticsPageViews(@QueryParam("module-name") String octaneModuleName, @QueryParam("start-date") String startDate, @QueryParam("end-date") String endDate) {
		GoogleAnalyticsHelper googleAnalyticsHelper = new GoogleAnalyticsHelper();
		JSONObject report = googleAnalyticsHelper.getReport(octaneModuleName, startDate, endDate, "ga:pageviews", "ga:pageTitle");
		//return report.toString();
		return Response.ok().entity(report.toString())
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}

	@GET
	@Path("trendPageViews")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getGoogleAnalyticsTrendPageViews(@QueryParam("module-name") String octaneModuleName, @QueryParam("start-date") String startDate, @QueryParam("end-date") String endDate) {
		GoogleAnalyticsHelper googleAnalyticsHelper = new GoogleAnalyticsHelper();
		JSONObject report = googleAnalyticsHelper.getReport(octaneModuleName, startDate, endDate, "ga:pageviews", "ga:pageTitle,ga:day");
		//return report.toString();
		return Response.ok().entity(report.toString())
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}

	@GET
	@Path("timeOnPage")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getGoogleAnalyticsTimeOnPage(@QueryParam("module-name") String octaneModuleName, @QueryParam("start-date") String startDate, @QueryParam("end-date") String endDate) {
		GoogleAnalyticsHelper googleAnalyticsHelper = new GoogleAnalyticsHelper();
		JSONObject report = googleAnalyticsHelper.getReport(octaneModuleName, startDate, endDate, "ga:timeOnPage", "ga:pageTitle");
		//return report.toString();
		return Response.ok().entity(report.toString())
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}

	@GET
	@Path("usersPerDay")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getGoogleAnalyticsUsersPerDay(@QueryParam("module-name") String octaneModuleName, @QueryParam("start-date") String startDate, @QueryParam("end-date") String endDate) {
		GoogleAnalyticsHelper googleAnalyticsHelper = new GoogleAnalyticsHelper();
		JSONObject report = googleAnalyticsHelper.getReport(octaneModuleName, startDate, endDate, "ga:1dayUsers", "ga:day");
		//return report.toString();
		return Response.ok().entity(report.toString())
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}

}


