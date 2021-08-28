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
    public class ItemController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        public ItemController(ILoggerManager logger)
        {
            _logger = logger;
        }
        [HttpPost]
        [Route("uploadItem")]
        public IActionResult UploadItem([FromBody] Item item)
        {
            int result;
            if (!int.TryParse(item.Cijena, out result))
			{
                _logger.LogWarning($"Pokusaj postavljanja artikla sa nepravilnim parametrima.  cijena={item.Cijena}");
                return NotFound("Nepravilan unos cijene.");
			}
            if(item.Cijena=="" || item.Naslov=="" || item.Kategorija=="" || item.NudimTrazim=="" || item.MjestoGrad=="" || item.Telefon == "")
			{
                _logger.LogWarning($"Pokusaj postavljanja artikla sa neunesenim svim parametrima.");
                return NotFound("Nisu uneseni svi parametri");
			}
			else
			{
                DataBaseItemProvider.AddItem(item);           
			}
            User u = DataBaseUserProvider.FindUserById(item.UserId);
            _logger.LogInformation($"Korisnik {u.KorisnickoIme} objavljuje novi artikal {item.Naslov}.");
            return Ok($"Uspjesno ste objavili artikal {item.Naslov}.");
        }

        [HttpPost]
        [Route("changeItem")]
        public IActionResult ChangeItem([FromBody] Item item)
        {
            int result;
            if (!int.TryParse(item.Cijena, out result))
            {
                _logger.LogWarning($"Pokusaj izmjene artikla sa nepravilnim parametrima.  cijena={item.Cijena}");
                return NotFound("Nepravilan unos cijene.");
            }
            if (item.Cijena == "" || item.Naslov == "" || item.Kategorija == "" || item.NudimTrazim == "" || item.MjestoGrad == "" || item.Telefon == "")
            {
                _logger.LogWarning($"Pokusaj izmjene artikla sa neunesenim svim parametrima.");
                return NotFound("Nisu uneseni svi parametri");
            }
            else
            {
                DataBaseItemProvider.UpdateItem(item);
            }
            User u = DataBaseUserProvider.FindUserById(item.UserId);

            _logger.LogInformation($"Korisnik {u.KorisnickoIme} vrsi izmjenu artikla {item.Naslov}.");

            return Ok($"Uspjesno ste izmijenili artikal {item.Naslov}.");
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<Item> GetUserItems(int id)
        {
            List<Item>items = DataBaseItemProvider.FindItemsByUserId(id);

            if (items == null)
                return new List<Item>();
            else
                return items.ToArray();
        }

        [HttpGet]
        [Route("getAllItems")]
        public IEnumerable<Item> GetAllItems()
        {
            return DataBaseItemProvider.RetrieveAllItems().ToArray();
        }

        [HttpGet]
        [Route("deleteItem")]
        public string DeleteItem(int id)
        {
            Item i = DataBaseItemProvider.FindItemById(id);

			if (i != null)
			{
                User u = DataBaseUserProvider.FindUserById(i.UserId);
                _logger.LogInformation($"Korisnik {u.KorisnickoIme} brise artikal {i.Naslov}.");
                DataBaseItemProvider.DeleteItem(id);
                return $"Uspjesno ste obrisali artikal {i.Naslov}.";
            }
			else
			{
                _logger.LogError($"Pokusaj brisanja nepostojeceg artikla.");

                return $"Brisanje artikla {i.Naslov} nije uspjelo.";
			}
        }

    }
}
