<!-- XSLT stylesheet -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- Template para el elemento raíz del XML -->
  <xsl:template match="/">
    <html>
      <body>
        <table border="1">
          <tr>
            <th>Nombre</th>
            <th>URL</th>
          </tr>
          <!-- Aplicar templates para cada elemento 'link' -->
          <!-- <xsl:apply-templates select="//link"/> -->
        </table>
      </body>
    </html>
  </xsl:template>

  <!-- Template para cada elemento 'link' -->
  <xsl:template match="link">
    <tr>
      <td><xsl:value-of select="name"/></td>
      <td>
		<!-- <a href="{url}"><xsl:value-of select="url"/></a> -->
		</td>
    </tr>
  </xsl:template>
</xsl:stylesheet>
