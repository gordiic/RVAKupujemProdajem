using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RVAProjekat.AppData;
using RVAProjekat.AppData.Interfaces;
using RVAProjekat.AppData.Strategy;
using RVAProjekat.Logger;
using RVAProjekat.Models;

namespace RVAProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        private IUserProvider userProvider = UserProviderStrategy.GetStrategy();
        private IItemProvider itemProvider = ItemProviderStrategy.GetStrategy();
        private IMarkProvider markProvider = MarkProviderStrategy.GetStrategy();
        private INotificationProvider notificationProvider = NotificationProviderStrategy.GetStrategy();
        public UserController(ILoggerManager logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] User u)
        {
            List<User> users = userProvider.RetrieveAllUsers();
            foreach (User user in users)
            {
                if (user.KorisnickoIme==u.KorisnickoIme)
                {
                    if (user.Lozinka == u.Lozinka)
					{
                        _logger.LogInformation($"Korisnik {user.KorisnickoIme} se ulogovao na sajt.");
                        return Ok(user);
					}
					else
                    {
                        _logger.LogWarning($"Pokusaj prijavljivanja sa netacnom lozinkom na korisnicko ime {user.KorisnickoIme}.");
                        return Ok("Netacna lozinka.");
                    }
                }
            }
            _logger.LogWarning($"Pokusaj prijavljivanja na nepostojeci nalog.");
            return Ok("Nepostojeci korisnik.");
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] User u)
        {
            if(u.Ime=="" || u.KorisnickoIme=="" || u.Lozinka=="" || u.Prezime=="" || u.Email == "")
			{
                return NotFound("Lose uneseni parametri.");

            }
            List<User>users = userProvider.RetrieveAllUsers();
            u.Uloga = "user";
            u.ProsjecnaOcjena = 0;
            u.BrOcjena = 0;
            foreach(User user in users)
			{
				if (user.KorisnickoIme == u.KorisnickoIme)
				{
                    _logger.LogWarning($"Pokusaj registracije na postojece ime {user.KorisnickoIme}.");
                    return NotFound("Korisnicko ime zauzeto.");
				}else if (user.Email == u.Email)
				{
                    _logger.LogWarning($"Pokusaj registracije na postojecu email adresu {user.Email}.");
                    return NotFound("Email adresa zauzeta.");
				}
			}
            userProvider.AddUser(u);
            _logger.LogInformation($"Korisnik {u.KorisnickoIme} se registrovao na sajt.");
            return Ok("Uspjesno ste se registrovali.");
        }
        [HttpPost]
        [Route("changeAccount")]
        public IActionResult ChangeAccount([FromBody] User u)
        {
            if (u.Ime == "" || u.KorisnickoIme == "" || u.Lozinka == "" || u.Prezime == "" || u.Email == "")
            {
                _logger.LogWarning($"Nepravilno uneseni parametri pri izmjeni korisnika sa id-om: {u.Id}.");
                return NotFound("Lose uneseni parametri.");

            }
            userProvider.UpdateUser(u);
            _logger.LogInformation($"Korisnik {u.KorisnickoIme} je izmijenio svoj profil.");
            return Ok("Uspjesno ste izmijenili svoj profil.");
        }
        //getUserById
        [HttpGet]
        [Route("getUserById")] //nastaviti
        public User GetUserById(int id)
        {
            User user = userProvider.FindUserById(id);

            if (user == null)
                return new User();
            else
                return user;
        }

        [HttpGet]
		public string Get()
		{
            return $"{ DateTime.Now} Server pokrenut."; 
		}


        [HttpGet]
        [Route("getAllUsers")]
        public IEnumerable<User> GetAllUsers()
        {
            return userProvider.RetrieveAllUsers().ToArray();
        }


        [HttpGet]
        [Route("deleteUser")]
        public string DeleteUser(int id)
        {
            User user = userProvider.FindUserById(id);
			if (user == null)
			{
                _logger.LogError($"Pokusaj brisanja nepostojeceg korisnika.");
                return $"Ne mozete obrisati korisnika koji ne postoji.";
            }
            userProvider.DeleteUser(id);
            itemProvider.DeleteUserItems(id);
            markProvider.DeleteUserMarks(id);
            notificationProvider.DeleteUserNotifications(id);
            _logger.LogInformation($"Profil korisnika {user.KorisnickoIme} je obrisan.");

            return $"Uspjesno ste obrisali korisnika {user.KorisnickoIme}.";
        }
    }
}
