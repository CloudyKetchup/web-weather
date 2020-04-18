package com.krypton.weatherprovider.jackson

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.krypton.weatherprovider.model.*

/**
 * Json deserializer for incoming request from weather api,
 * Will return an [WeatherApiResponse] or [SimpWeatherApiResponse] if response code is not 200
 * */
class SimpWeatherApiResponseDeserializer : StdDeserializer<SimpWeatherApiResponse>(SimpWeatherApiResponse::class.java)
{
	override fun deserialize(p: JsonParser?, ctxt: DeserializationContext?) : SimpWeatherApiResponse
	{
		val tree = p!!.codec!!.readTree<JsonNode>(p)

		val cod = tree.get("cod").asInt()

		if (cod == 200 && tree.get("weather") == null)
		{
			return SimpWeatherApiResponse(cod = cod)
		}
		return buildWeatherResponse(tree)
	}

	private fun buildWeatherResponse(node : JsonNode) : WeatherApiResponse
	{
		val weather = buildWeather(node.get("weather").toList()[0])
		val temp = buildTemp(node.get("main"))
		val visibility = node.get("visibility")?.asInt()
		val wind = buildWind(node.get("wind"))
		val country = node.get("sys").get("country").textValue()
		val city = node.get("name").textValue()
		val cod = node.get("cod").asInt()

		return WeatherApiResponse(weather, temp, visibility, wind, country, city, cod)
	}

	private fun buildWind(node : JsonNode) = Wind(node.get("speed").asDouble(), node.get("deg").asInt())

	private fun buildWeather(node : JsonNode) = Weather(
		node.get("main").textValue(),
		node.get("description").textValue()
	)

	private fun buildTemp(node : JsonNode) = Temp(
		temp = node.get("temp").asDouble(),
		feelsLike = node.get("feels_like").asDouble(),
		tempMin = node.get("temp_min").asDouble(),
		tempMax = node.get("temp_max").asDouble(),
		pressure = node.get("pressure").asInt(),
		humidity = node.get("humidity").asInt()
	)
}