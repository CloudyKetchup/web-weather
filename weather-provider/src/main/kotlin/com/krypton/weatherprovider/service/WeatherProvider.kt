package com.krypton.weatherprovider.service

import com.krypton.weatherprovider.model.WeatherApiResponse
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers

@Service
class WeatherProvider : IWeatherProvider
{
	private final val apiKey = "bb7265090bc45b4a3d769b988d55ffad"
	private val client = WebClient.builder().baseUrl("http://api.openweathermap.org/data/2.5/weather").build()

	override fun getByCity(cityName: String): Mono<WeatherApiResponse>
	{
		return client.get()
			.uri("?q=$cityName&APPID=$apiKey&units=metric")
			.retrieve()
			.bodyToMono(WeatherApiResponse::class.java)
			.subscribeOn(Schedulers.elastic())
	}
}