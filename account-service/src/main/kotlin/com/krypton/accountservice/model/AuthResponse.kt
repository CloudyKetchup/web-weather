package com.krypton.accountservice.model

import com.krypton.commonmodels.user.User

data class AuthResponse(
	val message : String,
	val httpStatus : String,
	val account : User? = null
)