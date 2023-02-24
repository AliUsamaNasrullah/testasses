using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using test.Models;
using test.Models.ViewModel;

namespace test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly ApplicationContext _context;


        public UserController(ApplicationContext context)
        {
            _context = context;
        }


        [HttpGet("GetUsers")]
        public async Task<ActionResult<IEnumerable<UserTable>>> GetUsers()
        {
            if (_context.users == null)
            {
                return NotFound();
            }
            return await _context.users.ToListAsync();
        }


        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<UserTable>> GetUserById(int id)
        {
            var user = await _context.users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost("AddUser")]
        public async Task<object> AddUser(UserViewModel vm)
        {

            try
            {
                UserTable user = new UserTable();
                user.Firstname = vm.Firstname;
                user.Lastname = vm.Lastname;
                user.Number = vm.Number;
                user.Email = vm.Email;
                _context.users.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPut("Update/{id}")]
        public async Task<object> Update(int id, UserViewModel vm)
        {
            try
            {
                UserTable user = new UserTable();
                user.Id = vm.Id;
                user.Firstname = vm.Firstname;
                user.Lastname = vm.Lastname;
                user.Number = vm.Number;
                user.Email = vm.Email;
                _context.users.Update(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpDelete("DeleteUserById/{id}")]
        public async Task<ActionResult> DeleteUserById(int id)
        {
            var user = await _context.users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
             _context.Remove(user) ;
           await   _context.SaveChangesAsync();
            return Ok();
        }
    }
}
