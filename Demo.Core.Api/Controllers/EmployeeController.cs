using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Demo.Core.Domain.Models;
using System.Reflection.Metadata.Ecma335;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Demo.Core.Api.Controllers
{
    public class EmployeeController : Controller
    {

        private readonly ILogger<EmployeeController> _logger;
        private Employee[] empData;
        public EmployeeController(ILogger<EmployeeController> logger)
        {
             empData = new Employee[]
           {
                             new Employee {
                                EmployeeId = "Slade Wilcox",
                                Name = "Ulla Diaz",
                                City = "Steven Williamson",
                                Department = "Brian Gibson",
                                Gender = "YHT28GNF2CY"

                },
                 new Employee{
                        EmployeeId= "Ainsley Owens",
                        Name= "Chava Crawford",
                        City= "Heather Nixon",
                        Department= "Dustin Rosales",
                        Gender= "HDB78TQJ4SQ"
                },
                 new Employee{
                        EmployeeId= "Adria Wheeler",
                        Name= "Nash Rosales",
                        City= "Price Avery",
                        Department= "Scarlet Burks",
                        Gender= "QFY79KEU1KI"
                },
                 new Employee{
                        EmployeeId= "Rudyard Wilkerson",
                        Name= "Kai Sosa",
                        City= "Patrick Payne",
                        Department= "Stone Dean",
                        Gender= "QBZ84YMU3RL"
                }
           };
            _logger = logger;

        }
        [HttpGet]
        [Route("employees")]
        public APIResponse Index()
        {

            APIResponse response = new APIResponse
            {
                Success = "true",
                Message = "Retrieved Successfully",
                Data = empData,
            };
            return response;
        }

        [HttpPost]
        [Route("employees/Create")]
        public int Create([FromBody] Employee employee)
        {
            //return empData..AddEmployee(employee);
            return 0;
        }

        [HttpGet]
        [Route("employees/Details/{id}")]
        public Employee Details(int id)
        {
            return null;
        }

        [HttpPut]
        [Route("employees/Edit")]
        public int Edit(Employee employee)
        {
            return 0;
        }

        [HttpDelete]
        [Route("employees/Delete/{id}")]
        public int Delete(int id)
        {
            return 0;
        }

    }
}
