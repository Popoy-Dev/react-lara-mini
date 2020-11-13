<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Song as SongResource;
use App\Song;
use Helper;
class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SongResource::collection(Song::select('band_name', 'id')->groupBy('band_name')->get());
    }
    public function view($band_name){
        return SongResource::collection(Song::select()->where('band_name', $band_name)->get());

    }
    public function search($song){
        return response()->json([
            'song' => $song
        ]);
     
        // return SongResource::collection(Song::select('band_name')->distinct()->get());

        // $posts = '';

        // if (trim($request->search)) {
        //     $posts = Post::where('song','LIKE',"%{$search}%")
        //                  ->orderBy('created_at','DESC')->get();        
        // }
      
    }


    /**
     * Show the form for creating a new resource.
     *
    //  * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'song' => 'required',
            'description' => 'required',
            'band_name' => 'required',
        ]);
        $song = new Song([
            'song' => $request->song,
            'description' => $request->description,
            'band_name' => $request->band_name,
        ]);
        $song->save();
        return response()->json([
            'song' => 'Song Successfully Created!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return new SongResource(Song::FindOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'song' => 'required',
            'description' => 'required',
            'band_name' => 'required',
        ]);
        $song = Song::FindOrFail($id);
        $song->song = $request->song;
        $song->description = $request->description;
        $song->band_name = $request->band_name;
        $song->save();
        return response()->json([
            'song' => 'Song Successfully Updated!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $song = Song::FindOrFail($id);
        $song->delete();
        return response()->json([
            'song' => 'Song Deleted!'
        ]);
    }
}
