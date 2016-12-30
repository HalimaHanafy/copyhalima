package com.example.halima.copyhalima;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import org.xwalk.core.XWalkActivity;
import org.xwalk.core.XWalkPreferences;
import org.xwalk.core.XWalkView;

import java.io.File;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;
import static com.example.halima.copyhalima.Decrypt.context;


public class MainActivity extends XWalkActivity {
    XWalkView webView;
    Button button;
    String fileName = "MTA5MWM0Zjg1NzJiZDk1LnppcA==";
    String DECRPTED_FILE_PATH;
    public static final String SUBJECT_LINK = "https://kashcool.com.kw/webapp/public/uploadedlesson/encrypt/MTA5MWM0Zjg1NzJiZDk1LnppcA%3D%3D.zip";
    public static final String SUBJECT_LINK2 = "https://kashcool.com.kw/webapp/public/uploadedlesson/encrypt/MTFhZWM0OGNkMDI0OTU0LnppcA==.zip";
    public static final String SUBJECT_LINK3 = "https://kashcool.com.kw/webapp/public/uploadedlesson/encrypt/OTliMDkxNjg1MmUzZDI5LnppcA==.zip";
    public static final String THEME = "https://kashcool.com.kw/webapp/public/uploadedlesson/theme/theme_arabic_2.zip";

    @Override
    protected void onXWalkReady() {
//        webView.load("file://" + getApplicationContext().getFilesDir().getPath()+"/kashcol/PHY/T2/U03_L01.html",null);

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initViews();

//        copyAssetFolder(getAssets(), "subjects",getApplicationContext().getFilesDir().getPath()+"/kashcol");
        CheckWhatInInternalStorage();

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                AsyncTaskRunner runner = new AsyncTaskRunner();
//                String sleepTime = time.getText().toString();
                runner.execute("100");


            }
        });
    }


    private class AsyncTaskRunner extends AsyncTask<String, String, String> {

        private String resp;
        ProgressDialog progressDialog;

        @Override
        protected String doInBackground(String... params) {
            publishProgress("Sleeping..."); // Calls onProgressUpdate()
            try {
//                int time = Integer.parseInt(params[0])*1000;
//
//                Thread.sleep(time);
//                resp = "Slept for " + params[0] + " seconds";


                Decrypt decrypt=new Decrypt();
//        DECRPTED_FILE_PATH=decrypt.decryptFile(fileName,context);
//        Log.e("PATH>>",DECRPTED_FILE_PATH);
//        openDownloadedFile(new File(DECRPTED_FILE_PATH), getApplicationContext());
                unzipFile();
                checkIfUnziipedTruly();

            } catch (Exception e) {
                e.printStackTrace();
                resp = e.getMessage();
            }
            return resp;
        }


        @Override
        protected void onPostExecute(String result) {
            // execution of result of Long time consuming operation
            progressDialog.dismiss();
            webView.load("file://" + getApplicationContext().getFilesDir().getPath()+"/kashcol/PHY/T2/U03_L01.html",null);

//            finalResult.setText(result);
        }


        @Override
        protected void onPreExecute() {
            progressDialog = ProgressDialog.show(MainActivity.this,
                    "ProgressDialog",
                    "Wait");
        }


        @Override
        protected void onProgressUpdate(String... text) {
//            finalResult.setText(text[0]);
            // Things to be done while execution of long running operation is in
            // progress. For example updating ProgessDialog
        }
    }


    private void unzipFile() {

        String zipFile = getApplicationContext().getFilesDir().getPath() + "/LOKAAAAssssdecrypted.zip";
        String unzipLocation = getApplicationContext().getFilesDir().getPath() + "/kashcol/PHY/T2/";
        Decompress d = new Decompress(zipFile, unzipLocation);
        d.unzip();


    }

    private void CheckWhatInInternalStorage() {
        File file = new File(getApplicationContext().getFilesDir().getPath());
        if (file.exists()) {
            Toast.makeText(this, "true", Toast.LENGTH_SHORT).show();
//            webView.load("file://" + getApplicationContext().getFilesDir()+"/kashcoool/PHY/T2/U03_SUB1_L01.html",null);
        }

    }

    private void initViews() {
        webView = (XWalkView) findViewById(R.id.wv);
        button = (Button) findViewById(R.id.btn);
        // turn on debugging

        Permissions.verifyStoragePermissions(this);

        XWalkPreferences.setValue(XWalkPreferences.REMOTE_DEBUGGING, true);

    }

    private void checkIfUnziipedTruly() {

        String path = getApplicationContext().getFilesDir() + "/kashcol/PHY/T2/";
        File file = new File(path);

        if (file.exists()) {
//            Toast.makeText(getApplicationContext(), "exists"+path, Toast.LENGTH_SHORT).show();
            Log.e("PATH>>", path);

            String path2 = getApplicationContext().getFilesDir() + "/kashcol/PHY/T2/U03_L01.html";
            File file2 = new File(path2);
            if (file2.exists()) {
                Toast.makeText(getApplicationContext(), "exists image", Toast.LENGTH_SHORT).show();

//                        webView.loadUrl("file://"+path2);

            } else {
//                Toast.makeText(getApplicationContext(), "not exists image", Toast.LENGTH_SHORT).show();

            }


        } else {
//            Toast.makeText(getApplicationContext(), "not exists", Toast.LENGTH_SHORT).show();
            // Toast File is not exists
        }
    }

}
///data/data/com.example.halima.copyhalima/files/kashcoool/PHY/T2/U03_SUB1_L01.html