using Microsoft.AspNetCore.Mvc;
using RVAProjekat.AppData;
using RVAProjekat.AppData.Interfaces;
using RVAProjekat.AppData.Strategy;
using RVAProjekat.Logger;
using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class OcjenaController : ControllerBase
	{
		private readonly ILoggerManager _logger;
		private IUserProvider userProvider = UserProviderStrategy.GetStrategy();
		private IMarkProvider markProvider = MarkProviderStrategy.GetStrategy();
		public OcjenaController(ILoggerManager logger)
		{
			_logger = logger;
		}


		[HttpPost]
		[Route("uploadOcjena")]
		public IActionResult UploadOcjena([FromBody]Ocjena ocjena)
		{
			if (ocjena.BrOcjene <= 0 || ocjena.Komentar == "")
			{
				_logger.LogWarning($"Neuspjelo postavljanje ocjene, nepravilni parametri: brOcjene={ocjena.BrOcjene} , komentar={ocjena.Komentar}");
				return NotFound("Neuspjesno postavljen komentar.");
			}
			User user = userProvider.FindUserById(ocjena.UserId);
			double suma = user.ProsjecnaOcjena * user.BrOcjena;
			suma += ocjena.BrOcjene;
			user.BrOcjena++;
			user.ProsjecnaOcjena = suma / user.BrOcjena;
			userProvider.UpdateUser(user);
			markProvider.AddOcjena(ocjena);

			_logger.LogInformation($"Korisnik {ocjena.KorisnickoIme} je ocijenio korisnika {user.KorisnickoIme}.");
			return Ok($"Uspjesno ste postavili ocjenu korisniku {user.KorisnickoIme}.");
		}
		
		[HttpGet]
		[Route("getOcjeneForUser")]
		public IEnumerable<Ocjena> GetOcjeneForUser(int id)
		{
			List<Ocjena> ocjene = markProvider.FindOcjeneByUserId(id);

			foreach(Ocjena o in ocjene)
			{
				o.User.Obavjestenja = null;
				o.User.Ocjene = null;
				o.User.Items = null;
			}
			if (ocjene == null)
				return new List<Ocjena>();
			else
				return ocjene.ToArray();
		}
	}
}
