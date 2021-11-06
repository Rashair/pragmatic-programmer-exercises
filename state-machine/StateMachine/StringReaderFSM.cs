using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace StateMachine
{
    public class StringReaderFSM
    {
        private List<string> strings;
        private State _currentState;
        private StringBuilder currentStringBuilder;

        public StringReaderFSM()
        {
            Clear();
        }

        public List<string> Execute(StreamReader reader)
        {
            while (!reader.EndOfStream)
            {
                var c = (char)reader.Read();
                Process(c);
            }
            return strings;
        }

        public void Clear()
        {
            strings = new();
            _currentState = State.OUTSIDE_STRING;
        }

        private void Process(char c)
        {
            _currentState = _currentState switch
            {
                State.OUTSIDE_STRING => OutsideString(c),
                State.STRING_START => StringStart(c),
                State.IN_STRING => InString(c),
                State.STRING_END => StringEnd(c),
                _ => throw new InvalidOperationException(),
            };
        }

        private State InString(char c)
        {
            switch (c)
            {
                case '"':
                    return State.STRING_END;

                default:
                    currentStringBuilder.Append(c);
                    return State.IN_STRING;
            }
        }

        public State StringStart(char c)
        {
            currentStringBuilder = new();
            switch (c)
            {
                case '"':
                    return State.STRING_END;

                default:
                    currentStringBuilder.Append(c);
                    return State.IN_STRING;
            }
        }

        public State OutsideString(char c)
        {
            switch (c)
            {
                case '"':
                    return State.STRING_START;

                default:
                    return State.OUTSIDE_STRING;
            }
        }

        public State StringEnd(char c)
        {
            strings.Add(currentStringBuilder.ToString());
            currentStringBuilder = null;

            switch (c)
            {
                case '"':
                    return State.STRING_START;

                default:
                    return State.OUTSIDE_STRING;
            }
        }
    }
}
