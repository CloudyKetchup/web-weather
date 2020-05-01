package com.krypton.databaseservice.routes

import com.krypton.databaseservice.service.cities.CitiesService
import kotlinx.coroutines.reactive.awaitSingle
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.*
import org.springframework.web.reactive.function.server.ServerResponse.*

/**
 * Router for fetching and modifying user cities
 * */
@Component
class CitiesRouter @Autowired constructor(citiesService : CitiesService)
{
	private val handler = CitiesHandler(citiesService)

	val router = coRouter {
		"/user/cities".nest {
			PUT("/save", handler::save)
			GET("/get", handler::get)
		}
	}
}

/**
 * Handler for cities router
 * */
class CitiesHandler(private val citiesService : CitiesService)
{
	// representation of incoming json body
	data class CitiesBody(val cities : List<String>)

	/**
	 * Update cities list of the user
	 *
	 * @param request	incoming request
	 * @return server response with updated cities or with error body
	 * */
	suspend fun save(request : ServerRequest) : ServerResponse
	{

		val id = request.queryParam("id")			// user id
		val body = request.awaitBodyOrNull<CitiesBody>()	// body with cities list

		return when
		{
			id.isEmpty -> badRequest().bodyValueAndAwait("id query param empty")
			body == null -> badRequest().bodyValueAndAwait("cities body empty")
			else -> citiesService.updateCities(id.get(), body.cities)
				.collectList()														// collect updated cities to list
				.flatMap { ok().bodyValue(it) }										// create response body with that list
				.switchIfEmpty(status(HttpStatus.INTERNAL_SERVER_ERROR).build())	// in case of error return error status
				.awaitSingle()
		}
	}

	/**
	 * Get cities list of a user found by id
	 *
	 * @param request	incoming request
	 * @return server response with cities list or not found status
	 * */
	suspend fun get(request : ServerRequest) : ServerResponse
	{
		val id = request.queryParam("id")	// user id

		return when
		{
			id.isEmpty -> badRequest().bodyValueAndAwait("id query param empty")
			else -> citiesService.getCities(id.get())
				.collectList()														// collect cities list
				.flatMap { ok().bodyValue(it) }										// create response body with list
				.switchIfEmpty(status(HttpStatus.INTERNAL_SERVER_ERROR).build())	// in case of error return error status
				.awaitSingle()
		}
	}
}
