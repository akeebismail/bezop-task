<?php

namespace App\Http\Controllers;

use App\CloudFile;
use Illuminate\Contracts\Filesystem\Cloud;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function makeFolder($name, $username= null){
        $disk = Storage::disk('gcs');
        $path = $username ? $name.'/'.$username : $name;
        return $disk->makeDirectory($path);
    }
    public function uploadFile(Request $request){

        $this->validate($request,[
            'filename' =>'required'
        ]);
        $user = auth()->user();
        $disk = Storage::disk('gcs');
        if ($request->hasFile('filename')){
            $files = $request->file('filename');
            $dir = 'kibb/bezop/'.$user->username;
            $results = [];
            foreach ($files as $item){
                //$item->move($disk->put($dir.$item->getClientOriginalName(),))
                $name = $item->getClientOriginalName();
                $put =$disk->put($dir.'/'.$name,file_get_contents($item->getRealPath()));
                if ($put){
                    $c_file = new CloudFile();
                    $c_file->name = $name;
                    $c_file->user_id = $user->id;
                    $c_file->active = true;
                    $c_file->file_path = $disk->url($dir.'/'.$name);
                    $c_file->save();
                }
            }
            return $this->respondWithSuccess('File Uploaded');
        }
        return $this->respondWithError('No file Uploaded');
    }

    public function getFile($id = null){
        $disk = Storage::disk('gcs');
        return $disk->allDirectories();
    }

    public function getFileCount(){
        $user = auth()->user();
        $cloud = CloudFile::where('user_id', $user->id);
        $active = $cloud->where('active',true)->count();
        $trash = $cloud->where('active',true)->onlyTrashed()->count();

        return $this->respondWithSuccess('Files details',[
            'active'=>$active,'trash'=>$trash]);
    }

    public function getAllFiles(){
        $user = auth()->user();
        $cloud = CloudFile::where('user_id', $user->id);
        $active = $cloud->where('active',true)->get();
        $trash = $cloud->where('active',true)->onlyTrashed()->get();

        return $this->respondWithSuccess('Files details',[
            'active'=>$active,'trash'=>$trash]);
    }

    public function deleteFile(Request $request){
        $this->validate($request,[
            'id' => 'required'
        ]);
        $id = $request->id;
        if (is_array($id)){
            return $this->respondWithSuccess('Files Deleted',CloudFile::destroy($id));
        }else{
            return $this->respondWithSuccess('file delete', CloudFile::find($id)->delete());
        }
    }

    public function dropDir($dir = null){
        $user = auth()->user();

       return dd($this->makeFolder('archived',$user->username));
    }
    public function trashFiles(){

    }
    public function archived(){
    }
}
