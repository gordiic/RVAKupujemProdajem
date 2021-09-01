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
	public class ObavjestenjaController : ControllerBase
	{
		private readonly ILoggerManager _logger;
		private IItemProvider itemProvider = ItemProviderStrategy.GetStrategy();
		private INotificationProvider notificationProvider = NotificationProviderStrategy.GetStrategy();
		private IUserProvider userProvider = UserProviderStrategy.GetStrategy();
		public ObavjestenjaController(ILoggerManager logger)
		{
			_logger = logger;
		}

		[HttpPost]
		[Route("uploadObavjestenje")]
		public IActionResult UploadObavjestenje([FromBody] Obavjestenje obavjestenje)
		{
			Item i = itemProvider.FindItemById(obavjestenje.IdArtikla);
			User u = userProvider.FindUserById(obavjestenje.UserId);
			List<Obavjestenje> obavjestenja = notificationProvider.RetrieveAllObavjestenja();
			if(obavjestenje.Opis.Contains("zeli da kupi artikal"))
			{
				foreach (Obavjestenje o in obavjestenja)
				{
					if (o.IdArtikla == obavjestenje.IdArtikla && o.UserId == obavjestenje.UserId  && o.OdkogaId == obavjestenje.OdkogaId && o.Opis.Contains("zeli da kupi artikal") && obavjestenje.Opis == "zeli da kupi artikal")
					{
						_logger.LogWarning($"Korisnik {obavjestenje.OdkogaIme} zeli da ponovo posalje zahtjev za kupovinu artikla {i.Naslov} korisnika {u.KorisnickoIme}.");
						return Ok("Vec ste poslali zahtjev za kupovinu datog artikla.");
					}
				}
				obavjestenje.Opis = obavjestenje.Opis + " " + i.Naslov;
				notificationProvider.AddObavjestenje(obavjestenje);
				_logger.LogInformation($"Korisnik {obavjestenje.OdkogaIme} zeli da kupi proizvod {i.Naslov} od korisnika {u.KorisnickoIme}.");
				return Ok($"Uspjesno ste poslali zahtjev za kupovinu artikla {i.Naslov} korisnika {u.KorisnickoIme}.");
			}
			else if(obavjestenje.Opis.Contains("odobrava kupovinu artikla|"))
			{
				string[] strs = obavjestenje.Opis.Split('|');
				int br = int.Parse(strs[1]);
				obavjestenje.Opis = strs[0]+ " " +i.Naslov;
				notificationProvider.DeleteObavjestenje(br);
				notificationProvider.AddObavjestenje(obavjestenje);
				obavjestenja = notificationProvider.RetrieveAllObavjestenja();
				foreach(Obavjestenje o in obavjestenja)
				{
					if(o.IdArtikla==obavjestenje.IdArtikla && o.Opis.Contains("zeli da kupi artikal"))
					{
						notificationProvider.DeleteObavjestenje(o.Id);
						notificationProvider.AddObavjestenje(new Obavjestenje(0, obavjestenje.OdkogaId, obavjestenje.OdkogaIme, o.OdkogaId, o.OdkogaIme, $"artikal {i.Naslov} je prodat drugom korisniku", o.IdArtikla));
					}
				}
				itemProvider.DeleteItem(obavjestenje.IdArtikla);
				_logger.LogInformation($"Korisnik {obavjestenje.OdkogaIme} odobrava korisniku {u.KorisnickoIme} kupovinu artikla {i.Naslov}.");
				return Ok($"Uspjesno odobrili kupovinu artikla {i.Naslov} korisniku {u.KorisnickoIme}.");
			}else if(obavjestenje.Opis.Contains("odbija kupovinu artikla|"))
			{
				string[] strs = obavjestenje.Opis.Split('|');
				int br = int.Parse(strs[1]);
				obavjestenje.Opis = strs[0] + i.Naslov + ".";
				notificationProvider.DeleteObavjestenje(br);

				notificationProvider.AddObavjestenje(obavjestenje);
				_logger.LogInformation($"Korisnik {obavjestenje.OdkogaIme} odbija korisniku {u.KorisnickoIme} kupovinu artikla {i.Naslov}.");
				return Ok($"Uspjesno odbili kupovinu artikla {i.Naslov} korisniku {u.KorisnickoIme}.");
			}

			return Ok("Ispalo iz ifa");

		}

		[HttpGet]
		[Route("getObavjestenjaForUser")]
		public IEnumerable<Obavjestenje> GetObavjestenjaForUser(int id)
		{
			List<Obavjestenje> obavjestenja = notificationProvider.FindObavjestenjaByUserId(id);
			
			if (obavjestenja == null)
				return new List<Obavjestenje>();
			else
			{
				foreach(Obavjestenje o in obavjestenja)
				{
					o.User.Ocjene = null;
					o.User.Obavjestenja = null;
					o.User.Items = null;
				}
				obavjestenja.Sort(delegate (Obavjestenje x, Obavjestenje y)
				{
					return y.Id.CompareTo(x.Id);
				});
					return obavjestenja.ToArray();
			}
		}

		
		[HttpGet]
		[Route("obrisiObavjestenje")]
		public string ObrisiObavjestenje(int id)
		{
			Obavjestenje o = notificationProvider.FindObavjestenjeById(id);
			User u = userProvider.FindUserById(o.UserId);
			if (o == null)
			{
				_logger.LogError($"Pokusaj brisanja nepostojeceg obavjestenja.");
				return "Ne moze se obrisati obavjestenje koje ne postoji.";
			}
			_logger.LogInformation($"Korisnik {u.KorisnickoIme} brise obavjestenje.");
			notificationProvider.DeleteObavjestenje(id);
			return "Uspjesno ste obrisali obavjestenje.";
		}
	}
}
