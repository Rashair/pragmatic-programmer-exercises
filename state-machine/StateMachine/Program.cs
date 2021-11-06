using System;
using System.Collections.Generic;
using System.IO;

namespace StateMachine
{
    class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("Hello in String Reader State Machine!");

            var machine = new StringReaderFSM();
            foreach (var path in GetInput())
            {
                var fileReader = new StreamReader(File.OpenRead(path));
                var strings = machine.Execute(fileReader);
                WriteResult(strings, path);

                machine.Clear();
            }
        }

        static IEnumerable<string> GetInput()
        {
            Console.WriteLine("Provide input file: ");
            Console.Write("Do you want to search in file or all files in folder? (f/a): ");
            var ans = Console.ReadLine().Trim();
            if (ans == "f")
            {
                yield return GetPath("file", File.Exists);
                yield break;
            }

            var path = GetPath("directory", Directory.Exists);
            foreach (var file in Directory.GetFiles(path, "*.*", SearchOption.AllDirectories))
            {
                yield return file;
            }
        }

        static string GetPath(string entityName, Predicate<string> Exists)
        {
            Console.Write($"Provide {entityName} path: ");
            var path = Console.ReadLine().Trim();
            if (!Exists(path))
            {
                Console.WriteLine($"{entityName.CaptaliseFirstLetter()} {path} does not exist.");
                return GetPath(entityName, Exists);
            }

            return path;
        }

        static void WriteResult(List<string> strings, string path)
        {
            Console.WriteLine($"Strings in '{path}':");
            foreach (var str in strings)
            {
                Console.WriteLine($@"""{str}""");
            }

            Console.WriteLine(new string('-', 10));
        }
    }
}