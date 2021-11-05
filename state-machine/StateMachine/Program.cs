using System;
using System.Collections.Generic;
using System.IO;

namespace StateMachine
{
    class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            Console.Write("Provide input file: ");
            var path = Console.ReadLine();

            var machine = new StateMachine();
            var strings = machine.Execute(new StreamReader(File.OpenRead(path)));

            Console.WriteLine("Strings:");
            foreach(var str in strings)
            {
                Console.WriteLine($@"""{str}""");
            }
        }
    }
}