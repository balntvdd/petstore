package com.natividad.petstore.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:}")
    private String datasourceUrl;

    @Value("${spring.datasource.host:}")
    private String host;

    @Value("${spring.datasource.port:5432}")
    private String port;

    @Value("${spring.datasource.database:}")
    private String database;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Value("${spring.datasource.driver-class-name:org.postgresql.Driver}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        String url = datasourceUrl;

        // If URL is provided but missing jdbc: prefix, fix it
        if (url != null && !url.isEmpty()) {
            if (!url.startsWith("jdbc:")) {
                url = "jdbc:" + url;
            }
        } else if (!host.isEmpty()) {
            // Construct URL from individual components
            url = String.format("jdbc:postgresql://%s:%s/%s", host, port, database);
        }

        return DataSourceBuilder.create()
                .driverClassName(driverClassName)
                .url(url)
                .username(username)
                .password(password)
                .build();
    }
}
