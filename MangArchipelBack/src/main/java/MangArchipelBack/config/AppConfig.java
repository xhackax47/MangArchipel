package MangArchipelBack.config;


import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.orm.jpa.JpaTransactionManager;
import com.jolbox.bonecp.BoneCPDataSource;

import org.springframework.security.authentication.AuthenticationManager;


@Configuration
@EnableTransactionManagement
public class AppConfig {
	@Primary
	@Bean
	public DataSource dataSource() {
      BoneCPDataSource dataSource = new BoneCPDataSource();
		
		
		dataSource.setDriverClass("org.postgresql.Driver");
		dataSource.setJdbcUrl("jdbc:postgresql://localhost/mangarchipel");
		dataSource.setUsername("postgres");
		dataSource.setPassword("admin");
		/*
		 * dataSource.setIdleConnectionTestPeriodInMinutes(20);
		 * dataSource.setIdleMaxAgeInMinutes(idleMaxAgeInMinutes);
		 * dataSource.setMaxConnectionsPerPartition(10);
		 * dataSource.setMinConnectionsPerPartition(5);
		 * dataSource.setPartitionCount(partitionCount);
		 * dataSource.setAcquireIncrement(acquireIncrement);
		 * dataSource.setStatementsCacheSize(statementsCacheSize);
		 */
		return dataSource;
	}

	@Bean(name="transactionManager")
	@Autowired
	public PlatformTransactionManager txManager(DataSource datasource) {		
		return new JpaTransactionManager();
	}

	@Bean
	@Autowired
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource datasource) {		
		LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
		emf.setDataSource(datasource);
		emf.setPackagesToScan( "MangArchipelBack","MangArchipelBack.config");
		JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		emf.setJpaVendorAdapter(vendorAdapter);
		emf.setJpaProperties(additionalProperties());
		return emf;
	}

	Properties additionalProperties() {
		Properties properties = new Properties();
		properties.setProperty("hibernate.hbm2ddl.auto", "update");
		properties.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQL9Dialect");
		// Oh oh !
//		properties.setProperty("hibernate.connection.provider_class", "org.hibernate.hikaricp.internal.HikariCPConnectionProvider");
		//properties.setProperty("hibernate.temp.use_jdbc_metadata_defaults","false");
		properties.setProperty("hibernate.enable_lazy_load_no_trans","true");
		properties.setProperty("hibernate.show_sql", "true");
		properties.setProperty("hibernate.format_sql", "true");
		return properties;
	}
	
	@Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


	
}

