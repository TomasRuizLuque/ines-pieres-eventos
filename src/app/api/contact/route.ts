import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const tipoCotizacion = formData.get('tipoCotizacion') as string;
    
    // Obtenemos campos comunes
    const email = formData.get('email') as string;
    const nombreCompleto = formData.get('nombreCompleto') as string;
    const telefono = formData.get('telefono') as string;

    // Campos variables según el tipo
    let subject = '';
    let htmlBody = '';
    let fromName = nombreCompleto;

    if (tipoCotizacion === 'presupuesto') {
      const nombresNovios = formData.get('nombresNovios') as string;
      const fecha = formData.get('fecha') as string;
      const lugar = formData.get('lugar') as string;
      const cantidadPersonas = formData.get('cantidadPersonas') as string;
      const ceremonia = formData.get('ceremonia') as string;
      const formato = formData.get('formato') as string;
      const estilo = formData.get('estilo') as string;
      const presupuesto = formData.get('presupuesto') as string;
      const inspiracion = formData.get('inspiracion') as string;
      const mensajeAdicional = formData.get('mensajeAdicional') as string;

      // El usuario pidió: "Nuevo presupuesto (Fecha del casamiento y lugar)"
      subject = `Nuevo presupuesto (${fecha} en ${lugar})`;
      fromName = nombresNovios || nombreCompleto;

      htmlBody = `
        <h2>Nuevo pedido de presupuesto para evento</h2>
        <p><strong>Nombres de los Novios:</strong> ${nombresNovios}</p>
        <p><strong>Nombre del Contacto:</strong> ${nombreCompleto}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <hr/>
        <p><strong>Fecha del Evento:</strong> ${fecha}</p>
        <p><strong>Lugar:</strong> ${lugar}</p>
        <p><strong>Cantidad de Personas:</strong> ${cantidadPersonas}</p>
        <p><strong>¿Ceremonia?:</strong> ${ceremonia}</p>
        <p><strong>Formato:</strong> ${formato}</p>
        <p><strong>Estilo:</strong> ${estilo}</p>
        <p><strong>Presupuesto destinado:</strong> ${presupuesto}</p>
        <p><strong>Links de Inspiración:</strong> ${inspiracion}</p>
        <p><strong>Mensaje Adicional:</strong> ${mensajeAdicional}</p>
      `;

      // ── Guardar como presupuesto pendiente en Supabase ──
      try {
        await supabase.from('presupuestos').insert({
          nombre_cliente: nombresNovios || nombreCompleto,
          email_cliente: email,
          telefono_cliente: telefono,
          fecha_evento: fecha || null,
          lugar_evento: lugar || null,
          nombres_novios: nombresNovios || null,
          cantidad_personas: cantidadPersonas || null,
          ceremonia: ceremonia || null,
          formato: formato || null,
          estilo: estilo || null,
          presupuesto_destinado: presupuesto || null,
          links_inspiracion: inspiracion || null,
          mensaje_adicional: mensajeAdicional || null,
          origen: 'formulario_web',
          estado: 'pendiente_cotizacion',
          items_json: [],
          subtotal: 0,
          flete: 0,
          iva: 0,
          total: 0,
        });
      } catch (dbErr) {
        console.error('Error guardando presupuesto en DB:', dbErr);
        // No bloquear el envío del mail si falla la DB
      }

    } else if (tipoCotizacion === 'proveedor') {
      const empresa = formData.get('empresa') as string;
      const servicio = formData.get('servicio') as string;
      const web = formData.get('web') as string;
      const mensaje = formData.get('mensaje') as string;

      subject = `Propuesta de Proveedor: ${empresa} - ${servicio}`;
      
      htmlBody = `
        <h2>Nueva propuesta de un proveedor</h2>
        <p><strong>Nombre:</strong> ${nombreCompleto}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Web/Redes:</strong> ${web}</p>
        <hr/>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `;
    } else {
      const mensaje = formData.get('mensaje') as string;

      subject = `Nuevo mensaje de contacto de ${nombreCompleto}`;
      
      htmlBody = `
        <h2>Mensaje desde el formulario web</h2>
        <p><strong>Nombre:</strong> ${nombreCompleto}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <hr/>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `;
    }

    // Archivos adjuntos
    const attachments = [];
    const files = formData.getAll('adjuntos');
    if (files) {
      for (const file of files) {
        if (file instanceof File && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          attachments.push({
            filename: file.name,
            content: buffer,
          });
        }
      }
    }

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== 'false', // true para 465, false para otros
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar correo
    await transporter.sendMail({
      from: `"${fromName} (Web Inés Pieres)" <${process.env.SMTP_USER}>`,
      to: 'eventos@inespieres.com',
      replyTo: email, // Esto hace que al darle "Responder" vaya al mail del cliente (ej. novios)
      subject: subject,
      html: htmlBody,
      attachments: attachments,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error enviando el correo:', error);
    return NextResponse.json(
      { error: 'Error enviando el correo' },
      { status: 500 }
    );
  }
}
