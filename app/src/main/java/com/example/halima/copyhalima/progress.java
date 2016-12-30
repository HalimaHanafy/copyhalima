package com.example.halima.copyhalima;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;
import static com.example.halima.copyhalima.Decrypt.context;

public class progress extends AsyncTask<String, String, String> {
    private Activity mContext;
    private ProgressDialog pDialog;
    String DECRPTED_FILE_PATH;
    String fileName="MTA5MWM0Zjg1NzJiZDk1LnppcA==";


    public progress (Activity mContext){
        this.mContext = mContext;
    }



    //    String image_url;
//    URL myFileUrl = null;
//    Bitmap bmImg = null;
    @Override
    protected void onPreExecute() {
        // TODO Auto-generated method stub

        super.onPreExecute();
        Log.e("On>>","Onpreeeeeeeeeeeeeeeeee");

//        pDialog = new ProgressDialog(mContext);  //<<-- Couldnt Recognise
//        pDialog.setMessage("Downloading Image ...");
//        pDialog.setIndeterminate(false);
//        pDialog.setCancelable(false);
//        ProgressDialog.show(mContext, "", "Saving...");

    }

    @Override
    protected String doInBackground(String... args) {
        // TODO Auto-generated method stub


        Decrypt decrypt=new Decrypt();
//        DECRPTED_FILE_PATH=decrypt.decryptFile(fileName,context);
//        Log.e("PATH>>",DECRPTED_FILE_PATH);
//        openDownloadedFile(new File(DECRPTED_FILE_PATH), getApplicationContext());
        unzipFile();
        checkIfUnziipedTruly();

        return null;
    }
    @Override
    protected void onPostExecute(String args) {
        // TODO Auto-generated method stub
//        pDialog.hide();
        Log.e("Done>>","fffffffffffffffffffffinish");
    }

    private void checkIfUnziipedTruly() {

        String path = mContext.getFilesDir() + "/kashcol/PHY/T2/";
        File file = new File(path);

        if (file.exists()) {
//            Toast.makeText(getApplicationContext(), "exists"+path, Toast.LENGTH_SHORT).show();
            Log.e("PATH>>", path);

            String path2 = mContext.getFilesDir() + "/kashcol/PHY/T2/U03_L01.html";
            File file2 = new File(path2);
            if (file2.exists()) {
                Toast.makeText(mContext, "exists image", Toast.LENGTH_SHORT).show();

//                        webView.loadUrl("file://"+path2);

            } else {
//                Toast.makeText(getApplicationContext(), "not exists image", Toast.LENGTH_SHORT).show();

            }


        } else {
//            Toast.makeText(getApplicationContext(), "not exists", Toast.LENGTH_SHORT).show();
            // Toast File is not exists
        }
    }


    private void unzipFile() {

        String zipFile = mContext.getFilesDir().getPath() + "/LOKAAAAssssdecrypted.zip";
        String unzipLocation = mContext.getFilesDir().getPath() + "/kashcol/PHY/T2/";
        Decompress d = new Decompress(zipFile, unzipLocation);
        d.unzip();


    }

    public void openDownloadedFile(File f, Context myContext) {
        Log.e("tag", "found");
        try {
            if (!f.isDirectory())
                f.mkdir();
            Intent testIntent = new Intent(Intent.ACTION_VIEW);
            testIntent.setType("application/zip");
            testIntent.setAction(Intent.ACTION_VIEW);
            Uri uri = Uri.fromFile(f);
            testIntent.setDataAndType(uri, "application/zip");
            testIntent.addFlags(FLAG_ACTIVITY_NEW_TASK);
            myContext.startActivity(testIntent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}