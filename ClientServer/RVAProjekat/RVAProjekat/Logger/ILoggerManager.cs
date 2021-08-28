using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.Logger
{
	public interface ILoggerManager
	{
		void LogInformation(string message);
		void LogError(string message);
		void LogWarning(string message);
		void LogFatal(string message);
	}
}
