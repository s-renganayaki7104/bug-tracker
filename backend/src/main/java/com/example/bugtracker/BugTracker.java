package com.example.bugtracker;

import static spark.Spark.*;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.gson.Gson;

import java.io.FileInputStream;
import java.util.*;
import java.util.concurrent.ExecutionException;

public class BugTracker {

    static Firestore db;
    static Gson gson = new Gson();

    static class Bug {
        public int id;
        public String title;
        public String description;
        public String status;
        public String priority;
        public String reporter;
        public String assignedTo;
        public String resolvedBy;
        public String createdAt;
        public String resolvedAt;

        public Bug() {}

        public Bug(int id, String title, String description, String status, String priority,
                   String reporter, String assignedTo, String resolvedBy, String createdAt, String resolvedAt) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.status = status;
            this.priority = priority;
            this.reporter = reporter;
            this.assignedTo = assignedTo;
            this.resolvedBy = resolvedBy;
            this.createdAt = createdAt;
            this.resolvedAt = resolvedAt;
        }
    }

    public static void main(String[] args) throws Exception {
        // ✅ Load Firebase credentials from environment variable
       FirebaseOptions options;

String path = System.getenv("FIREBASE_KEY_PATH");
if (path != null) {
    FileInputStream serviceAccount = new FileInputStream(path);
    options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .build();
} else {
    String firebaseCreds = System.getenv("FIREBASE_CONFIG_JSON");
    if (firebaseCreds == null) {
        throw new IllegalStateException("No Firebase credentials found");
    }
    InputStream serviceAccountStream = new ByteArrayInputStream(firebaseCreds.getBytes(StandardCharsets.UTF_8));
    options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccountStream))
        .build();
}

FirebaseApp.initializeApp(options);
db = FirestoreClient.getFirestore();


        port(getAssignedPort());

static int getAssignedPort() {
    String port = System.getenv("PORT");
    if (port != null) {
        return Integer.parseInt(port);
    }
    return 8080; // fallback for local testing
}


        // ✅ Enable CORS
        options("/*", (request, response) -> {
            String headers = request.headers("Access-Control-Request-Headers");
            if (headers != null) response.header("Access-Control-Allow-Headers", headers);

            String method = request.headers("Access-Control-Request-Method");
            if (method != null) response.header("Access-Control-Allow-Methods", method);

            return "OK";
        });

        before((req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
            res.type("application/json");
        });

        System.out.println("✅ Firestore Initialized: " + db);

        // POST /bugs
        post("/bugs", (req, res) -> {
            try {
                Bug newBug = gson.fromJson(req.body(), Bug.class);
                newBug.id = (int) (System.currentTimeMillis() % Integer.MAX_VALUE);
                newBug.createdAt = new Date().toString();
                db.collection("bugs").document(String.valueOf(newBug.id)).set(newBug);
                res.status(201);
                return gson.toJson(newBug);
            } catch (Exception e) {
                e.printStackTrace();
                res.status(500);
                return "{\"error\": \"" + e.getMessage() + "\"}";
            }
        });

        // GET /bugs
        get("/bugs", (req, res) -> {
            try {
                List<Bug> bugList = new ArrayList<>();
                ApiFuture<QuerySnapshot> future = db.collection("bugs").get();
                List<QueryDocumentSnapshot> documents = future.get().getDocuments();
                for (QueryDocumentSnapshot doc : documents) {
                    bugList.add(doc.toObject(Bug.class));
                }
                return gson.toJson(bugList);
            } catch (Exception e) {
                e.printStackTrace();
                res.status(500);
                return "{\"error\": \"" + e.getMessage() + "\"}";
            }
        });

        // DELETE /bugs/:id
        delete("/bugs/:id", (req, res) -> {
            try {
                String id = req.params(":id");
                db.collection("bugs").document(id).delete();
                return "{\"message\": \"Deleted bug with ID " + id + "\"}";
            } catch (Exception e) {
                e.printStackTrace();
                res.status(500);
                return "{\"error\": \"" + e.getMessage() + "\"}";
            }
        });

        // PUT /bugs/:id
        put("/bugs/:id", (req, res) -> {
            try {
                String id = req.params(":id");
                Bug updatedBug = gson.fromJson(req.body(), Bug.class);
                updatedBug.id = Integer.parseInt(id);

                if ("Resolved".equalsIgnoreCase(updatedBug.status) &&
                        (updatedBug.resolvedAt == null || updatedBug.resolvedAt.isEmpty())) {
                    updatedBug.resolvedAt = new Date().toString();
                }

                db.collection("bugs").document(id).set(updatedBug);
                return gson.toJson(updatedBug);
            } catch (Exception e) {
                e.printStackTrace();
                res.status(500);
                return "{\"error\": \"" + e.getMessage() + "\"}";
            }
        });
    }
}
