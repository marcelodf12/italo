/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package italo;

import java.io.Serializable;
import java.util.List;
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
@Table(name = "facturas")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Facturas.findAll", query = "SELECT f FROM Facturas f"),
    @NamedQuery(name = "Facturas.findById", query = "SELECT f FROM Facturas f WHERE f.id = :id"),
    @NamedQuery(name = "Facturas.findByFecha", query = "SELECT f FROM Facturas f WHERE f.fecha = :fecha"),
    @NamedQuery(name = "Facturas.findByNombre", query = "SELECT f FROM Facturas f WHERE f.nombre = :nombre"),
    @NamedQuery(name = "Facturas.findByRuc", query = "SELECT f FROM Facturas f WHERE f.ruc = :ruc"),
    @NamedQuery(name = "Facturas.findByDireccion", query = "SELECT f FROM Facturas f WHERE f.direccion = :direccion"),
    @NamedQuery(name = "Facturas.findByTimbrado", query = "SELECT f FROM Facturas f WHERE f.timbrado = :timbrado"),
    @NamedQuery(name = "Facturas.findByTotal", query = "SELECT f FROM Facturas f WHERE f.total = :total"),
    @NamedQuery(name = "Facturas.findByIva5", query = "SELECT f FROM Facturas f WHERE f.iva5 = :iva5"),
    @NamedQuery(name = "Facturas.findByIva10", query = "SELECT f FROM Facturas f WHERE f.iva10 = :iva10")})
public class Facturas implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 8)
    @Column(name = "fecha")
    private String fecha;
    @Size(max = 255)
    @Column(name = "nombre")
    private String nombre;
    @Size(max = 20)
    @Column(name = "ruc")
    private String ruc;
    @Size(max = 255)
    @Column(name = "direccion")
    private String direccion;
    @Size(max = 10)
    @Column(name = "timbrado")
    private String timbrado;
    @Column(name = "total")
    private Integer total;
    @Column(name = "iva5")
    private Integer iva5;
    @Column(name = "iva10")
    private Integer iva10;
    @OneToMany(mappedBy = "fkFactura")
    private List<Detallefactura> detallefacturaList;
    @OneToMany(mappedBy = "fkFactura")
    private List<Pagos> pagosList;

    public Facturas() {
    }

    public Facturas(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTimbrado() {
        return timbrado;
    }

    public void setTimbrado(String timbrado) {
        this.timbrado = timbrado;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getIva5() {
        return iva5;
    }

    public void setIva5(Integer iva5) {
        this.iva5 = iva5;
    }

    public Integer getIva10() {
        return iva10;
    }

    public void setIva10(Integer iva10) {
        this.iva10 = iva10;
    }

    @XmlTransient
    public List<Detallefactura> getDetallefacturaList() {
        return detallefacturaList;
    }

    public void setDetallefacturaList(List<Detallefactura> detallefacturaList) {
        this.detallefacturaList = detallefacturaList;
    }

    @XmlTransient
    public List<Pagos> getPagosList() {
        return pagosList;
    }

    public void setPagosList(List<Pagos> pagosList) {
        this.pagosList = pagosList;
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
        if (!(object instanceof Facturas)) {
            return false;
        }
        Facturas other = (Facturas) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "italo.Facturas[ id=" + id + " ]";
    }
    
}
