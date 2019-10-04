<?php

namespace App\Http\Controllers;

use App\Weight;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class WeightController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Auth::user()->weights->jsonSerialize(), Response::HTTP_OK);
    }
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $weight = new Weight();
        $weight->user_id = Auth::id();
        $weight->date = $request->date;
        $weight->weight = $request->weight; 
        $weight->save();
        return response($weight->jsonSerialize(), Response::HTTP_CREATED);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Weight  $weight
     * @return \Illuminate\Http\Response
     */
    public function show(Weight $weight)
    {    
        if (Auth::user() != $weight->user) {
            return response("Access forbidden", Response::HTTP_FORBIDDEN);
        } 
        return response($weight->jsonSerialize(), Response::HTTP_OK); 
       
    }
 

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Weight  $weight
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Weight $weight)
    { 
        if (Auth::user() != $weight->user) {
            return response("Access forbidden", Response::HTTP_FORBIDDEN);
        } 
        $weight->weight = $request->weight;
        $weight->save();
        return response(null, Response::HTTP_OK);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Weight  $weight
     * @return \Illuminate\Http\Response
     */
    public function destroy(Weight $weight)
    {
        if (Auth::user() != $weight->user) {
            return response("Access forbidden", Response::HTTP_FORBIDDEN);
        } 
        $weight->delete();
        return response(null, Response::HTTP_OK); 
    }
}
