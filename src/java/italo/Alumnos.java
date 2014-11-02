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
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author marcelo
 */
@Entity
@Table(name = "alumnos", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"cedula"})})
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Alumnos.findAll", query = "SELECT a FROM Alumnos a"),
    @NamedQuery(name = "Alumnos.findById", query = "SELECT a FROM Alumnos a WHERE a.id = :id"),
    @NamedQuery(name = "Alumnos.findByNombre", query = "SELECT a FROM Alumnos a WHERE a.nombre = :nombre"),
    @NamedQuery(name = "Alumnos.findByApellido", query = "SELECT a FROM Alumnos a WHERE a.apellido = :apellido"),
    @NamedQuery(name = "Alumnos.findByCedula", query = "SELECT a FROM Alumnos a WHERE a.cedula = :cedula"),
    @NamedQuery(name = "Alumnos.findByNacimiento", query = "SELECT a FROM Alumnos a WHERE a.nacimiento = :nacimiento"),
    @NamedQuery(name = "Alumnos.findByResponsable", query = "SELECT a FROM Alumnos a WHERE a.responsable = :responsable"),
    @NamedQuery(name = "Alumnos.findByCedulaResponsable", query = "SELECT a FROM Alumnos a WHERE a.cedulaResponsable = :cedulaResponsable"),
    @NamedQuery(name = "Alumnos.findBySexo", query = "SELECT a FROM Alumnos a WHERE a.sexo = :sexo")})
public class Alumnos implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "apellido", nullable = false, length = 100)
    private String apellido;
    @Column(name = "cedula")
    private Integer cedula;
    @Size(max = 8)
    @Column(name = "nacimiento", length = 8)
    private String nacimiento;
    @Size(max = 200)
    @Column(name = "responsable", length = 200)
    private String responsable;
    @Column(name = "cedula_responsable")
    private Integer cedulaResponsable;
    @Size(max = 1)
    @Column(name = "sexo", length = 1)
    private String sexo;
    @OneToMany(mappedBy = "fkAlumno")
    private List<Matriculas> matriculasList;

    public Alumnos() {
    }

    public Alumnos(Integer id) {
        this.id = id;
    }

    public Alumnos(Integer id, String nombre, String apellido) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Integer getCedula() {
        return cedula;
    }

    public void setCedula(Integer cedula) {
        this.cedula = cedula;
    }

    public String getNacimiento() {
        return nacimiento;
    }

    public void setNacimiento(String nacimiento) {
        this.nacimiento = nacimiento;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public Integer getCedulaResponsable() {
        return cedulaResponsable;
    }

    public void setCedulaResponsable(Integer cedulaResponsable) {
        this.cedulaResponsable = cedulaResponsable;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    @XmlTransient
    public List<Matriculas> getMatriculasList() {
        return matriculasList;
    }

    public void setMatriculasList(List<Matriculas> matriculasList) {
        this.matriculasList = matriculasList;
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
        if (!(object instanceof Alumnos)) {
            return false;
        }
        Alumnos other = (Alumnos) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "italo.Alumnos[ id=" + id + " ]";
    }
    
}
