using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;


namespace FortunetellingMVC.App_Code
{
    public class Mylogger
    {
        /// <summary>
        /// 多线程锁定对象
        /// </summary>
        private static readonly object mutex = "mutex";
        private static readonly object ojb = "obj";
        private static readonly object mutexnew = "newobject";
        private static Mylogger _instance;
        public static Mylogger Instance
        {
            get {
                if (_instance == null)
                {
                    lock (mutexnew)
                    {
                        _instance = new Mylogger();
                    }
                }
                return _instance;
            }
        }

        private Mylogger() { }

        /// <summary>
        /// 发送日志
        /// </summary>
        /// <param name="message"></param>
        public void Log(string message)
        {
            string logFilePath = "ForturnLog.txt";
            lock (mutex)
            {
                string dire = ConfigurationManager.AppSettings["loggerfile"];
                if (!Directory.Exists(dire))
                {
                    Directory.CreateDirectory(dire);
                }
                logFilePath = dire + logFilePath;

                using (StreamWriter sw = new StreamWriter(logFilePath, true))
                {
                    // Add some text to the file.
                    sw.Write("[" + DateTime.Now + "]  ");
                    sw.WriteLine(message);
                    sw.Flush();
                    //sw.Close();
                }

                FileInfo fi = new FileInfo(logFilePath);

                if (fi.Length > 100000)
                {
                    int i = 1;
                    string testFileName = fi.Directory.FullName + "\\" + fi.Name.Replace("." + fi.Extension, "") + i + ".txt";
                    
                    while (File.Exists(testFileName))
                    {
                        i++;
                        testFileName = fi.Directory.FullName + "\\" + fi.Name.Replace("." + fi.Extension, "") + i + ".txt";

                    }
                    fi.CopyTo(testFileName);
                    fi.Delete();
                    // rename the current file to a number
                }
            }
        }

        /// <summary>
        /// 测试log 当正式运行时可以通过配置文件决定是否记录
        /// </summary>
        /// <param name="message"></param>
        public void TestLog(string message)
        {
            ///读取配置文件 决定是否需要记录信息
            string istestlog = ConfigurationManager.AppSettings["istestlog"];
            if ("true" == istestlog.ToLower())
            {
                Log(message);
            }
        }

        /// <summary>
        /// 发送日志重载方法
        /// </summary>
        /// <param name="message"></param>
        /// <param name="fileName">保存的文件名</param>
        public void Log(string message, string fileName)
        {
            string logFilePath = fileName;
            lock (ojb)
            {
                string dire = ConfigurationManager.AppSettings["loggerfile"];
                if (!Directory.Exists(dire))
                {
                    Directory.CreateDirectory(dire);
                }
                logFilePath = dire + logFilePath;

                using (StreamWriter sw = new StreamWriter(logFilePath, true))
                {
                    // Add some text to the file.
                    sw.Write("[" + DateTime.Now + "]  ");
                    sw.WriteLine(message);
                    //sw.Close();
                }

                FileInfo fi = new FileInfo(logFilePath);

                if (fi.Length > 100000)
                {
                    int i = 1;
                    string testFileName = fi.Directory.FullName + "\\" + fi.Name.Replace("." + fi.Extension, "") + i + ".txt";
                    Console.WriteLine("testFileName:" + testFileName);
                    while (File.Exists(testFileName))
                    {
                        i++;
                        testFileName = fi.Directory.FullName + "\\" + fi.Name.Replace("." + fi.Extension, "") + i + ".txt";
                    }
                    fi.CopyTo(testFileName);
                    fi.Delete();
                    // rename the current file to a number
                }
            }
        }

    }
}