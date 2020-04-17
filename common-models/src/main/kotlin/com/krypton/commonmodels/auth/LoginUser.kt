package com.krypton.commonmodels.auth

import com.krypton.commonmodels.user.User

data class LoginUser(
	val message : String,
	val user : User? = null
)
