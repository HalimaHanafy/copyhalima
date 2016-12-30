package com.example.halima.copyhalima;

import android.content.Context;
import android.os.Environment;
import android.util.Base64;

import org.bouncycastle.crypto.BlockCipher;
import org.bouncycastle.crypto.InvalidCipherTextException;
import org.bouncycastle.crypto.engines.RijndaelEngine;
import org.bouncycastle.crypto.paddings.PaddedBufferedBlockCipher;
import org.bouncycastle.crypto.paddings.ZeroBytePadding;
import org.bouncycastle.crypto.params.KeyParameter;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by halimahanafy on 16/10/16.
 */

public class Decrypt {
    static Context context;

    static String PATH= Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)+"/";
//    static String KEY="6fb132f26f2490bd2b491f4fc525167e";



    public String decryptFile(String filename, Context context) {
        this.context=context;
        try {

            String data= getFileContent(PATH +filename+".zip");
            String KEY=md5(filename);
            String decryptedData=decrypt(KEY,data);
            byte[] decryptecData_decode64=decodeBase64(decryptedData);
            String decryptedFileLink=creatFile(decryptecData_decode64,"LOKAAAAssssdecrypted.zip");

            return decryptedFileLink;

        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    public static final String md5(final String s) {
        final String MD5 = "MD5";
        try {
            // Create MD5 Hash
            MessageDigest digest = java.security.MessageDigest
                    .getInstance(MD5);
            digest.update(s.getBytes());
            byte messageDigest[] = digest.digest();

            // Create Hex String
            StringBuilder hexString = new StringBuilder();
            for (byte aMessageDigest : messageDigest) {
                String h = Integer.toHexString(0xFF & aMessageDigest);
                while (h.length() < 2)
                    h = "0" + h;
                hexString.append(h);
            }
            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }



    public static String decrypt(String key,String data) throws InvalidCipherTextException, IOException {

        byte[] givenKey = key.getBytes(Charset.forName("ASCII"));
        final int keysize = 256;
        byte[] keyData = new byte[keysize / Byte.SIZE];
        System.arraycopy(givenKey, 0, keyData, 0, Math.min(givenKey.length, keyData.length));
        KeyParameter keys = new KeyParameter(keyData);
        BlockCipher rijndael = new RijndaelEngine(256);
        ZeroBytePadding c = new ZeroBytePadding();
        PaddedBufferedBlockCipher pbbc = new PaddedBufferedBlockCipher(rijndael, c);
        byte[] dataaa = Base64.decode(data, Base64.DEFAULT);
        pbbc.init(false, keys);
        byte[] decrypted = new byte[pbbc.getOutputSize(dataaa.length)];

        int offset = 0;
        offset += pbbc.processBytes(dataaa, 0, dataaa.length, decrypted, offset);
        try {
            offset += pbbc.doFinal(decrypted, offset);
        } catch (InvalidCipherTextException e) {
            e.printStackTrace();
        }

        //        byte[] fileContentBase64 = decodeBase64(DecrtptedData);


        return new String(decrypted, Charset.forName("UTF8")).replaceAll("\\x00+$", "");
    }

    public static String creatFile(byte[] data, String fileName) throws IOException {
//        File extStore = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        File internalPATH=context.getFilesDir();
        FileOutputStream out = new FileOutputStream(internalPATH+"/"+fileName);
        out.write(data);
        out.close();
        return internalPATH.getAbsolutePath()+"/"+fileName;
    }

    private static byte[] decodeBase64(String fileContent) throws UnsupportedEncodingException {

        // Receiving side
        //        String text = new String(data, "UTF-8");
        return Base64.decode(fileContent, Base64.DEFAULT);

    }


    public static String getFileContent (String filePath) throws Exception {
        File fl = new File(filePath);

        FileInputStream fin = new FileInputStream(fl);
        String ret = convertStreamToString(fin);
        //Make sure you close all streams.
        fin.close();
        return ret;
    }

    public static String convertStreamToString(InputStream is) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line = null;
        while ((line = reader.readLine()) != null) {
            sb.append(line).append("\n");
        }
        reader.close();
        return sb.toString();
    }



}
