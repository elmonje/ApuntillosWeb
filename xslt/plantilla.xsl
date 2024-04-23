<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/catalog">
  <html>
    <body>
       <h1>Mi Catálogo de CD's</h1>
				<xsl:for-each select="cd">
					<p><xsl:value-of select="title" />, <xsl:value-of select="artist" /></p>
				</xsl:for-each>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>
