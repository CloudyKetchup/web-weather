package com.krypton.weatherprovider.service

import com.krypton.weatherprovider.model.WeatherApiResponse
import reactor.core.publisher.Mono

interface IWeatherProvider
{
	fun getByCity(cityName : String) : Mono<WeatherApiResponse>
}