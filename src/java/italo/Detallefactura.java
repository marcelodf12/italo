/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package italo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author marcelo
 */
@Entity
@Table(name = "detallefactura")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Detallefactura.findAll", query = "SELECT d FROM Detallefactura d"),
    @NamedQuery(name = "Detallefactura.findById", query = "SELECT d FROM Detallefactura d WHERE d.id = :id"),
    @NamedQuery(name = "Detallefactura.findByMonto", query = "SELECT d FROM Detallefactura d WHERE d.monto = :monto")})
public class Detallefactura implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "monto")
    private Integer monto;
    @JoinColumn(name = "fk_factura", referencedColumnName = "id")
    @ManyToOne
    private Facturas fkFactura;
    @JoinColumn(name = "fk_articulo", referencedColumnName = "id")
    @ManyToOne
    private Articulos fkArticulo;

    public Detallefactura() {
    }

    public Detallefactura(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMonto() {
        return monto;
    }

    public void setMonto(Integer monto) {
        this.monto = monto;
    }

    public Facturas getFkFactura() {
        return fkFactura;
    }

    public void setFkFactura(Facturas fkFactura) {
        this.fkFactura = fkFactura;
    }

    public Articulos getFkArticulo() {
        return fkArticulo;
    }

    public void setFkArticulo(Articulos fkArticulo) {
        this.fkArticulo = fkArticulo;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Detallefactura)) {
            return false;
        }
        Detallefactura other = (Detallefactura) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "italo.Detallefactura[ id=" + id + " ]";
    }
    
}
