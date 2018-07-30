using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace FortunetellingMVC.App_Code
{
    public class SqlHelper
    {
        public string con
        {
            get { return ConfigurationManager.ConnectionStrings["defaultConnection"].ConnectionString; }
        }

        /// <summary>
        /// 执行sql语句命令,返回dateset
        /// </summary>
        /// <param name="sqlcommand"></param>
        public DataSet ExecuteCommand(string sqlcommand)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            SqlCommand sqlcmd = new SqlCommand(sqlcommand, sqlcon);
            sqlcmd.CommandTimeout = 120;

            DataSet ds = new DataSet();
            SqlDataAdapter sda = new SqlDataAdapter(sqlcmd);

            try
            {
                if (sqlcon.State == ConnectionState.Closed)
                    sqlcon.Open();
                //sqlcmd.ExecuteNonQuery();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                ds = null;
                Mylogger.Instance.Log("excute sql " + sqlcommand + ", error :" + ex.Message);
            }
            finally
            {
                if (sqlcon.State == ConnectionState.Open)
                    sqlcon.Close();
                sda.Dispose();
                sqlcmd.Dispose();
                sqlcon.Dispose();
            }

            return ds;
        }

        public DataSet ExecuteCommand(string sqlcommand, int cmdtimeout)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            SqlCommand sqlcmd = new SqlCommand(sqlcommand, sqlcon);
            sqlcmd.CommandTimeout = cmdtimeout;

            DataSet ds = new DataSet();
            SqlDataAdapter sda = new SqlDataAdapter(sqlcmd);

            try
            {
                if (sqlcon.State == ConnectionState.Closed)
                    sqlcon.Open();
                //sqlcmd.ExecuteNonQuery();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                ds = null;
                Mylogger.Instance.Log("excute sql " + sqlcommand + ", error :" + ex.Message);
            }
            finally
            {
                if (sqlcon.State == ConnectionState.Open)
                    sqlcon.Close();
                sda.Dispose();
                sqlcmd.Dispose();
                sqlcon.Dispose();
            }

            return ds;
        }

        public DataSet ExecuteCommand(SqlCommand cmd)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            cmd.Connection = sqlcon;
            cmd.CommandTimeout = 120;
            DataSet ds = new DataSet();
            SqlDataAdapter sda = new SqlDataAdapter(cmd);
            try
            {
                if (sqlcon.State == ConnectionState.Closed)
                    sqlcon.Open();
                //cmd.ExecuteNonQuery();
                sda.Fill(ds);

            }
            catch (Exception ex)
            {
                Mylogger.Instance.Log("error sql " + cmd.CommandText + " error:" + ex.Message);
                ds = null;
            }
            finally
            {
                if (sqlcon.State == ConnectionState.Open)
                    sqlcon.Close();
                sda.Dispose();
                sqlcon.Dispose();
            }
            return ds;
        }

        /// <summary>
        /// 执行sql语句 ，成功返回 true  失败返回false
        /// </summary>
        /// <param name="sqlcommand"></param>
        /// <returns></returns>
        public bool ExecuteNoReturn(string sqlcommand)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            SqlCommand sqlcmd = new SqlCommand(sqlcommand, sqlcon);
            sqlcmd.CommandTimeout = 120;
            bool flag = false;
            try
            {
                if (sqlcon.State == ConnectionState.Closed)
                    sqlcon.Open();
                sqlcmd.ExecuteNonQuery();
                flag = true;
            }
            catch (Exception e)
            {
                Mylogger.Instance.Log("error sql " + sqlcommand + " error:" + e.Message);
            }
            finally
            {
                if (sqlcon.State == ConnectionState.Open)
                    sqlcon.Close();
                sqlcmd.Dispose();
                sqlcon.Dispose();
            }
            return flag;

        }

        public bool Execute(SqlCommand cmd)
        {
            SqlConnection sqlcon = new SqlConnection(con);
            cmd.Connection = sqlcon;
            cmd.CommandTimeout = 120;
            bool flag = false;
            try
            {
                if (sqlcon.State != ConnectionState.Open)
                {
                    sqlcon.Open();
                }
                cmd.ExecuteNonQuery();
                flag = true;
            }
            catch (Exception e)
            {
                System.Text.StringBuilder sb = new System.Text.StringBuilder(10000);
                for (int itemi = 0; itemi < cmd.Parameters.Count; itemi++)
                {
                    sb.Append(cmd.Parameters[itemi].ParameterName + " : " + cmd.Parameters[itemi].Value + " .....");
                }
                Mylogger.Instance.Log(sb.ToString());
                Mylogger.Instance.Log("error sql" + cmd.CommandText + " error:" + e.Message + e.StackTrace);
            }
            finally
            {
                sqlcon.Close();
                sqlcon.Dispose();
                cmd.Dispose();
            }
            return flag;
        }
    }
}