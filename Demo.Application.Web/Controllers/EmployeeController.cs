using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Demo.Application.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : Controller
    {


        private readonly ILogger<EmployeeController> _logger;
        private readonly IConfiguration _configuration;
        private readonly string apiUrl;

        public EmployeeController(ILogger<EmployeeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            apiUrl = _configuration.GetValue<string>("API:local");
        }

        [HttpGet]
        public async Task <IEnumerable<Employee>> Get()
        {
            HttpClient client = new HttpClient();
            var model = await client.GetFromJsonAsync<IEnumerable<Employee>>(apiUrl + "employees");
            //IEnumerable<WeatherForecast> forecasts =  client.GetAsync("http://localhost:5263/WeatherForecast/weatherforecast") as IEnumerable<WeatherForecast>;
            return model;
        }

        [HttpPost]
        [Route("create")]
        public async Task<int> Create([FromBody] Employee employee)
        {
            HttpClient client = new HttpClient();
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(employee);
            var data = new System.Net.Http.StringContent(json, Encoding.UTF8, "application/json");
            var model = await client.PostAsync(apiUrl + "employees/Create", data);
            //IEnumerable<WeatherForecast> forecasts =  client.GetAsync("http://localhost:5263/WeatherForecast/weatherforecast") as IEnumerable<WeatherForecast>;
          
            return 0;
        }

        [HttpGet]
        [Route("api/Employee/Details/{id}")]
        public Employee Details(int id)
        {
            return null;
        }

        [HttpPut]
        [Route("api/Employee/Edit")]
        public int Edit(Employee employee)
        {
            return 0;
        }

        [HttpDelete]
        [Route("api/Employee/Delete/{id}")]
        public int Delete(int id)
        {
            return 0;
        }

       
    }
}
