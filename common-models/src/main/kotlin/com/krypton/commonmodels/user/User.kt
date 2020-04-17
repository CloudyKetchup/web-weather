package com.krypton.commonmodels.user

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.krypton.commonmodels.jackson.SimpUserDeserializer
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document
@JsonDeserialize(using = SimpUserDeserializer::class)
data class User(
	@Id
	var id : UUID? = UUID.randomUUID(),
	@Indexed(unique = true)
	var name : String,
	@Indexed(unique = true)
	var email : String,
	var password : String,
	var cities : List<String> = listOf()
)
