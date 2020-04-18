package com.krypton.weatherprovider.model

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.krypton.weatherprovider.jackson.SimpWeatherApiResponseDeserializer

data class Weather(
	val main : String,
	val description : String
)

data class Temp(
	val temp : Double,
	val feelsLike : Double,
	val tempMin : Double,
	val tempMax : Double,
	val pressure : Int,
	val humidity : Int
)

data class Wind(
	val speed : Double,
	val	deg : Int
)

@JsonDeserialize(using = SimpWeatherApiResponseDeserializer::class)
open class SimpWeatherApiResponse(
	open val cod : Int
)

data class WeatherApiResponse(
	val weather : Weather,
	val temp : Temp,
	val visibility : Int?,
	val wind : Wind,
	val country : String,
	val city : String,
	override val cod : Int
) : SimpWeatherApiResponse(cod)