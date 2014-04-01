<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output
		method="xml"
		encoding="UTF-8"
		omit-xml-declaration="yes"/>

	<xsl:param name="arthur"/>
	<xsl:param name="showModal" select="0"/>

	<xsl:template match="*">
		<!-- the return MUST be enclosed in a single node -->
		<div id="xslTransform-results">
			<xsl:if test="string-length($arthur) > 0">
				We received the XSLT parameter <em><strong>arthur</strong></em> with a value of <em><strong><xsl:value-of select="$arthur"/></strong></em>.
			</xsl:if>
			<ol>
				<xsl:call-template name="looper">
					<xsl:with-param name="list" select="*"/>
				</xsl:call-template>
			</ol>
			<xsl:if test="$showModal = 1">
				<p style="text-align: center"><a href="javascript:void(0);" class="jqmClose">Close me</a></p>
			</xsl:if>
			<script type="text/javascript">
			<![CDATA[
			$("#xslTransform-results ol li").hover(
				function(){
					$(this).css('font-weight','bold');
					return false;
				},
				function(){
					$(this).css('font-weight','normal');
					return false;
				}
			);
			]]>
			</script>
		</div>
	</xsl:template>

	<xsl:template name="looper">
		<xsl:param name="list"/>
		<xsl:for-each select="$list">
			<xsl:choose>
				<xsl:when test="count(*) > 0">
					<ol>
						<xsl:call-template name="looper">
							<xsl:with-param name="list" select="*"/>
						</xsl:call-template>
					</ol>
				</xsl:when>
				<xsl:otherwise>
					<li><xsl:value-of select="name()"/>: <xsl:value-of select="."/></li>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>

</xsl:stylesheet>