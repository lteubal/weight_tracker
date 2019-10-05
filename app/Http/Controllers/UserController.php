<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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
        if($request->avatar != $user->avatar) {
            $file_name = $this->createImageFromBase64($request,'avatar'); 
            $user->avatar = '/images/'.$file_name;
        }
        $user->save();
        return response(null, Response::HTTP_OK); 
    }
    public function createImageFromBase64(Request $request, $name){ 
        $file_data = $request->input($name);   
        $file_name = 'image_'.time().'.png'; //generating unique file name; 
        @list($type, $file_data) = explode(';', $file_data);
        @list(, $file_data) = explode(',', $file_data); 
        if($file_data!=""){ // storing image in storage/app/public Folder 
            \Storage::disk('public')->put($file_name,base64_decode($file_data)); 
        } 
        return $file_name;
    }  
}

