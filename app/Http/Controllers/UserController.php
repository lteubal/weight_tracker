<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{ 
    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $user = Auth::user(); 
        return response($user->jsonSerialize(), Response::HTTP_OK);  
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {  
        if (Auth::user() != $user) {
            return response("Access forbidden", Response::HTTP_FORBIDDEN);
        }

        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->desired_weight = $request->desired_weight;
        $user->height_in_inches = $request->height_in_inches;
        $user->gender = $request->gender;
        $user->birthdate = $request->birthdate;
        $user->activity_level = $request->activity_level;
        $user->system = $request->system;
        $user->avatar = $request->avatar;
        $user->save();
        return response(null, Response::HTTP_OK); 
    }
 
}
