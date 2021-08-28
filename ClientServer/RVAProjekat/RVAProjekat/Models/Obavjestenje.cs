using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.Models
{
	public class Obavjestenje
	{
		private int id;
		private int odkogaId;
		private string odkogaIme;
		private int komeId;
		private string komeIme;
		private string opis;
		private int idArtikla;

		public Obavjestenje(int id, int odkogaId, string odkogaIme, int komeId, string komeIme, string opis, int idArtikla)
		{
			Id = id;
			OdkogaId = odkogaId;
			OdkogaIme = odkogaIme;
			KomeId = komeId;
			KomeIme = komeIme;
			Opis = opis;
			IdArtikla = idArtikla;
		}

		public Obavjestenje()
		{

		}

		public int Id { get => id; set => id = value; }
		public int OdkogaId { get => odkogaId; set => odkogaId = value; }
		public string OdkogaIme { get => odkogaIme; set => odkogaIme = value; }
		public int KomeId { get => komeId; set => komeId = value; }
		public string KomeIme { get => komeIme; set => komeIme = value; }
		public string Opis { get => opis; set => opis = value; }
		public int IdArtikla { get => idArtikla; set => idArtikla = value; }
	}
}
