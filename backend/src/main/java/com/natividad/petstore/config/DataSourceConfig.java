package com.natividad.petstore.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:}")
    private String datasourceUrl;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() throws URISyntaxException {
        String url = datasourceUrl;

        // If URL doesn't start with jdbc:, fix it
        if (url != null && !url.isEmpty()) {
            if (!url.startsWith("jdbc:")) {
                // Parse the Render connection string (postgresql://user:pass@host/db)
                if (url.startsWith("postgresql://")) {
                    try {
                        // Remove the scheme and add jdbc:postgresql://
                        String urlWithoutScheme = url.substring("postgresql://".length());
                        
                        // Parse user:pass@host/db format
                        if (urlWithoutScheme.contains("@")) {
                            String[] parts = urlWithoutScheme.split("@", 1);
                            String userPass = parts[0];
                            String hostDb = parts[1];
                            
                            // Extract username and password if provided in URL
                            if (userPass.contains(":")) {
                                String[] creds = userPass.split(":", 1);
                                username = creds[0];
                                password = creds[1];
                            }
                            
                            // Handle host:port/db or just host/db
                            String host = hostDb;
                            String port = "5432"; // Default PostgreSQL port
                            String database = "";
                            
                            if (hostDb.contains("/")) {
                                String[] hostParts = hostDb.split("/", 1);
                                host = hostParts[0];
                                database = hostParts[1];
                            }
                            
                            // Check if port is included in host
                            if (host.contains(":")) {
                                String[] hostPortParts = host.split(":", 1);
                                host = hostPortParts[0];
                                port = hostPortParts[1];
                            }
                            
                            url = String.format("jdbc:postgresql://%s:%s/%s", host, port, database);
                        }
                    } catch (Exception e) {
                        // Fallback: just prepend jdbc:
                        url = "jdbc:" + url;
                    }
                } else {
                    url = "jdbc:" + url;
                }
            }
        }

        return DataSourceBuilder.create()
                .driverClassName("org.postgresql.Driver")
                .url(url)
                .username(username)
                .password(password)
                .build();
    }
}
