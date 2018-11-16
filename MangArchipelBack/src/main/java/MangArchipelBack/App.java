package MangArchipelBack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;


/**
 * Hello world!
 *
 */
@SpringBootApplication
@EntityScan(basePackages = {"MangArchipelBack"}
)
public class App 
{
	
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    }
}
