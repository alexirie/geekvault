package com.example.app;

import android.view.View;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;


public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Desactivar efecto rebote de la WebView
        this.bridge.getWebView().setOverScrollMode(View.OVER_SCROLL_NEVER);

    }
}
