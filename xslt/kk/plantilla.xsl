<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/catalog">
<head>
    <meta charset="UTF-8">
	<style>
	    #divContenido {
        display: flex;
        justify-content: center;
		}
		#divNombreContenido{
		font-size: 30px;
		}
		#divTitulos{
		font-size: 25px;
		}
		#contenedorHipervinculos{
		font-size: 20px;
		}
		#contenedorVideos{
		font-size: 20px;
		}		
		#contenedorApuntillos{
		font-size: 20px;
		}	
		#tdTitulos{
		font-size: 25px;
		background-color: #E0E0E0;
		}
		#tdNombreContenido{
		font-size: 25px;
		background-color: #BDBDBD;
		}		
	</style>	
</head>
  <html>
    <body>
       <h1>Mi Catálogo</h1>
				<xsl:for-each select="cd">
					<p><xsl:value-of select="title" />, <xsl:value-of select="artist" /></p>
				</xsl:for-each>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>
