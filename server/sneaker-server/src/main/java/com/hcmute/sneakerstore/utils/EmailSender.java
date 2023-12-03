package com.hcmute.sneakerstore.utils;

import org.simplejavamail.api.email.Email;
import org.simplejavamail.api.mailer.Mailer;
import org.simplejavamail.api.mailer.config.TransportStrategy;
import org.simplejavamail.email.EmailBuilder;
import org.simplejavamail.mailer.MailerBuilder;

public class EmailSender {
	private static String username = "cuongit2003@gmail.com";
	private static String password = "aupn szmq kxon rnql";

	public static void sendMail(String from, String to,String name, String subject, String plainText) {
		Email email = EmailBuilder.startingBlank()
			    .from("Sneaker Store", from)
			    .to(name, to)
			    .withSubject(subject)
			    .withPlainText(plainText)
			    .buildEmail();

			Mailer mailer = MailerBuilder
			    .withSMTPServer("smtp.gmail.com", 587, username, password)
			    .withTransportStrategy(TransportStrategy.SMTP_TLS)
			    .withSessionTimeout(10 * 1000)
			    .buildMailer();

			mailer.sendMail(email);

	}
	
	public static void sendHtmlMail(String from, String to,String name, String subject, String htmlText) {
		Email email = EmailBuilder.startingBlank()
			    .from("Sneaker Store", from)
			    .to(name, to)
			    .withSubject(subject)
			    .withHTMLText(htmlText)
			    .buildEmail();

			Mailer mailer = MailerBuilder
			    .withSMTPServer("smtp.gmail.com", 587, username, password)
			    .withTransportStrategy(TransportStrategy.SMTP_TLS)
			    .withSessionTimeout(10 * 1000)
			    .buildMailer();
			
			mailer.sendMail(email);

	}
}
