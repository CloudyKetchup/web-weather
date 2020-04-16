package com.krypton.commonmodels.jackson

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.krypton.commonmodels.user.User
import java.util.*
import kotlin.collections.ArrayList

/**
 * Deserializer for [User] model, basically just sets
 * name and password from incoming json, if id present assign it,
 * otherwise will generate a random one, will assign an empty list
 * to cities property and will add cities from json if are present
 * */
class SimpUserDeserializer : StdDeserializer<User>(User::class.java)
{
	override fun deserialize(p: JsonParser?, ctxt: DeserializationContext?) : User
	{
		val tree = p!!.codec!!.readTree<JsonNode>(p)
		val id = tree.get("id")?.textValue()?.let { UUID.fromString(it) } ?: UUID.randomUUID()
		val cities = ArrayList<String>()

		// add cities from json if present
		tree.get("cities")?.toList()?.parallelStream()?.forEach { cities.add(it.textValue()) }

		return User(
			id = id,
			name = tree.get("name").textValue(),
			password = tree.get("password").textValue(),
			cities = cities)
	}
}