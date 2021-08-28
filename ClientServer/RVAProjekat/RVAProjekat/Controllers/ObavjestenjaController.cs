using Microsoft.AspNetCore.Mvc;
using RVAProjekat.AppData;
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
		public ObavjestenjaController(ILoggerManager logger)
		{
			_logger = logger;
		}

		[HttpPost]
		[Route("uploadObavjestenje")]
		public IActionResult UploadObavjestenje([FromBody] Obavjestenje obavjestenje)
		{
			List<Obavjestenje> obavjestenja = DataBaseNotificationProvider.RetrieveAllObavjestenja();
			if(obavjestenje.Opis.Contains("zeli da kupi artikal"))
			{
				foreach (Obavjestenje o in obavjestenja)
				{
					if (o.IdArtikla == obavjestenje.IdArtikla && o.KomeId == obavjestenje.KomeId && o.OdkogaId == obavjestenje.OdkogaId && o.Opis == "zeli da kupi artikal" && obavjestenje.Opis == "zeli da kupi artikal")
					{
						_logger.LogWarning($"Korisnik {obavjestenje.OdkogaIme} zeli da ponovo posalje zahtjev za kupovinu artikla korisnika {obavjestenje.KomeIme}.");
						return Ok("Vec ste poslali zahtjev za kupovinu datog artikla.");
					}
				}
				DataBaseNotificationProvider.AddObavjestenje(obavjestenje);
				_logger.LogInformation($"Korisnik {obavjestenje.OdkogaIme} zeli da kupi proizvod od korisnika {obavjestenje.KomeIme}.");
				return Ok($"Uspjesno ste poslali zahtjev za kupovinu artikla korisnika {obavjestenje.KomeIme}.");
			}
			else if(obavjestenje.Opis.Contains("odobrava kupovinu artikla|"))
			{
				string[] strs = obavjestenje.Opis.Split('|');
				int br = int.Parse(strs[1]);
				obavjestenje.Opis = strs[0];
				DataBaseNotificationProvider.DeleteObavjestenje(br);

				DataBaseNotificationProvider.AddObavjestenje(obavjestenje);
				//DataBaseProvider.DeleteItem(new Id(obavjestenje.IdArtikla));
				_logger.LogInformation($"Korisnik {obavjestenje.OdkogaIme} odobrava korisniku {obavjestenje.KomeIme} kupovinu artikla.");
				return Ok($"Uspjesno odobrili kupovinu artikla korisniku {obavjestenje.KomeIme}.");
			}else if(obavjestenje.Opis.Contains("odbija kupovinu artikla|"))
			{
				string[] strs = obavjestenje.Opis.Split('|');
				int br = int.Parse(strs[1]);
				obavjestenje.Opis = strs[0];
				DataBaseNotificationProvider.DeleteObavjestenje(br);

				DataBaseNotificationProvider.AddObavjestenje(obavjestenje);
				_logger.LogInformation($"Korisnik {obavjestenje.OdkogaIme} odbija korisniku {obavjestenje.KomeIme} kupovinu artikla.");
				return Ok($"Uspjesno odbili kupovinu artikla korisniku {obavjestenje.KomeIme}.");
			}

			return Ok("Ispalo iz ifa");

		}

		[HttpGet]
		[Route("getObavjestenjaForUser")]
		public IEnumerable<Obavjestenje> GetObavjestenjaForUser(int id)
		{
			List<Obavjestenje> obavjestenja = DataBaseNotificationProvider.FindObavjestenjaByUserId(id);
			foreach(Obavjestenje o in obavjestenja)
			{
				if(o.Opis== "zeli da kupi artikal" || o.Opis == "odobrava kupovinu artikla")
				{
					Item i = DataBaseItemProvider.FindItemById(o.IdArtikla);
					o.Opis = o.Opis + " " + i.Naslov;
				}
			}
			if (obavjestenja == null)
				return new List<Obavjestenje>();
			else
			{
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
			Obavjestenje o = DataBaseNotificationProvider.FindObavjestenjeById(id);
			if (o == null)
			{
				_logger.LogError($"Pokusaj brisanja nepostojeceg obavjestenja.");
				return "Ne moze se obrisati obavjestenje koje ne postoji.";
			}
			_logger.LogInformation($"Korisnik {o.KomeIme} brise obavjestenje .");
			DataBaseNotificationProvider.DeleteObavjestenje(id);
			return "Uspjesno ste obrisali obavjestenje.";
		}
	}
}
