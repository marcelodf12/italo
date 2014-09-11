/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package italo;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author marcelo
 */
@Entity
@Table(name = "articulos")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Articulos.findAll", query = "SELECT a FROM Articulos a"),
    @NamedQuery(name = "Articulos.findById", query = "SELECT a FROM Articulos a WHERE a.id = :id"),
    @NamedQuery(name = "Articulos.findByNombre", query = "SELECT a FROM Articulos a WHERE a.nombre = :nombre"),
    @NamedQuery(name = "Articulos.findByPrecioLista", query = "SELECT a FROM Articulos a WHERE a.precioLista = :precioLista"),
    @NamedQuery(name = "Articulos.findByImpuesto", query = "SELECT a FROM Articulos a WHERE a.impuesto = :impuesto")})
public class Articulos implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "precio_lista")
    private Integer precioLista;
    @Size(max = 1)
    @Column(name = "impuesto")
    private String impuesto;
    @OneToMany(mappedBy = "fkArticulo")
    private Collection<Detallefactura> detallefacturaCollection;

    public Articulos() {
    }

    public Articulos(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getPrecioLista() {
        return precioLista;
    }

    public void setPrecioLista(Integer precioLista) {
        this.precioLista = precioLista;
    }

    public String getImpuesto() {
        return impuesto;
    }

    public void setImpuesto(String impuesto) {
        this.impuesto = impuesto;
    }

    @XmlTransient
    public Collection<Detallefactura> getDetallefacturaCollection() {
        return detallefacturaCollection;
    }

    public void setDetallefacturaCollection(Collection<Detallefactura> detallefacturaCollection) {
        this.detallefacturaCollection = detallefacturaCollection;
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
        if (!(object instanceof Articulos)) {
            return false;
        }
        Articulos other = (Articulos) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "italo.Articulos[ id=" + id + " ]";
    }
    
}
