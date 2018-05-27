<?php

namespace App\Http\Controllers;

use App\CloudFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
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
        if (request()->exists('q') && request()->get('q')== 'active'){
           $cloud->where('active',true);
        }
        elseif (request()->exists('q') && request()->exists('q')== 'trash'){
            $cloud->where('active',false);
        }

        return $this->respondWithSuccess('Files details',['file_count'=>$cloud->count()]);
    }

    public function getAllFiles($dir = null){

    }

    public function deleteFile($id){

    }

    public function dropDir($dir = null){
        $user = auth()->user();
        $dist = Storage::disk('gcs');
        $dist->directories('kibb/bezop');
        $delete=$dist->delete('kibb/bezop/damiz/1526992197_200w_(31).gif');

        return dd($delete);
    }
    public function trashFiles(){

    }
    public function archived(){
    }
}
