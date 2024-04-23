<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- Template para el elemento raíz del XML -->
  <xsl:template match="/contenidos">
  <html>
	<head>
		<meta charset="UTF-8"/>
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
    <body>
	<div id="divContenido">
		<table border="0">
			<tr>
				<td>	
				<table border="0">
					<tr>
						<td id="tdNombreContenido">
							<xsl:value-of select="/contenidos/nombre" />
						</td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td align ="center">
					<table border="1" cellpadding="2" cellspacing="0">	
						<tr>
							<td id="tdTitulos">
								<div id="divTitulos">Hipervinculos</div>
							</td>
						</tr>
						<tr>
							<td>
								<div id="contenedorHipervinculos">
								<xsl:for-each select="enlaces/enlace"> 
										<a><xsl:attribute name="href"><xsl:value-of select="url"/></xsl:attribute>
											<xsl:value-of select="name" />
										</a>
										<br/>
								</xsl:for-each>								
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<br/>
							</td>
						</tr>
						<tr>
							<td id="tdTitulos">
								<div id="divTitulos">Videos</div>
							</td>
						</tr>			
						<tr>
							<td>		
								<div id="contenedorVideos">
									<xsl:for-each select="videos/video">  
												<a>
													<xsl:attribute name="href"><xsl:value-of select="url"/></xsl:attribute>
													<xsl:value-of select="name" />
												</a>
												<br/>
									</xsl:for-each>										
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<br/>
							</td>
						</tr>				
						<tr>
							<td id="tdTitulos">
								<div id="divTitulos">Apuntillos</div>
							</td>
						</tr>			
						<tr>
							<td>		
								<div id="contenedorApuntillos">
									<xsl:for-each select="apuntes/apunte">  
												<a>
													<xsl:attribute name="href"><xsl:value-of select="url"/></xsl:attribute>
													<xsl:value-of select="name" />
												</a>
												<br/>
									</xsl:for-each>									
								</div>
							</td>
						</tr>						
					</table>	
				</td>
			</tr>
		</table>
	</div>		

	
    </body>
  </html>			
  </xsl:template>
</xsl:stylesheet>
