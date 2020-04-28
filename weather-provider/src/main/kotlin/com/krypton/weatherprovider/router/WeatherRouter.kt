package com.krypton.weatherprovider.router

import com.krypton.weatherprovider.model.ErrorApiResponse
import com.krypton.weatherprovider.service.IWeatherProvider
import kotlinx.coroutines.reactive.awaitSingle
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.*
import org.springframework.web.reactive.function.server.ServerResponse.*
import reactor.core.publisher.Mono

@Component
class WeatherRouter @Autowired constructor(weatherProvider : IWeatherProvider)
{
	val handler = WeatherHandler(weatherProvider)

	val router = coRouter { "/weather".nest {
		GET("/get", handler::getByCity)
	}}
}

class WeatherHandler constructor(private val weatherProvider : IWeatherProvider)
{
	suspend fun getByCity(request : ServerRequest) : ServerResponse
	{
		val city = request.queryParam("city")

		return when
		{
			city.isEmpty -> badRequest().bodyValueAndAwait(ErrorApiResponse(
				"city query param not present",
				HttpStatus.BAD_REQUEST.value()
			))
			city.get().isBlank() -> badRequest().bodyValueAndAwait(ErrorApiResponse(
				"city query param is empty",
				HttpStatus.BAD_REQUEST.value()
			))
			else -> weatherProvider.getByCity(city.get())
				.flatMap { if (it.cod == 200) Mono.just(it) else Mono.empty() }
				.flatMap { ok().bodyValue(it) }
				.onErrorReturn(notFound().buildAndAwait())
				.awaitSingle()
		}
	}
}