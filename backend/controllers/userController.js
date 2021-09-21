import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from '../models/userModel.js'

// @DESC    AUTH USER & GET TOKEN
// @ROUTE   POST /api/users/login
// @ACCESS  PUBLIC
const authUser